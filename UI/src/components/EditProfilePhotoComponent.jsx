import React, { useRef, useEffect, useState } from "react";
import fetchData from "../../utils/FetchAPI.js";
import {
  CLOUD_NAME,
  CLOUD_URL,
  UPLOAD_PRESET,
} from "../../utils/CloudinaryConfig.js";
import { handleCreatePostValidation } from "../../utils/validation.js";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_TO_EDIT_PROFILE_PHOTO, API_TO_SAVE_POST } from "../../utils/APIRequestUrl.js";

const EditProfilePhotoComponent = (props) => {
  const [post, setPost] = useState({
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);

  const createPostModal = useRef(null);
  const { userDetails } = props;


  useEffect(() => {
    M.Modal.init(createPostModal.current);
  }, [], (console.log(userDetails)));

  const handleOnChange = (event) => {
    const { name, files } = event.target;

    if (name === "image") {
      setPost((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    }
  };

  const editProfilePhoto = async (e) => {
    e.preventDefault();

    const form = document.forms.createPostform;
    const post = {
      image: form.image.files[0],
    };
    let formErrors = handleCreatePostValidation(post.image);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setIsLoading(true);
      await uploadPostToCloudinary(post);
    }
  };

  const uploadPostToCloudinary = async (post) => {
    const data = new FormData();
    data.append("file", post.image);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    try {
      const res = await fetch(CLOUD_URL, {
        method: "POST",
        body: data,
      });

      const cloudinaryData = await res.json();

      if (cloudinaryData.url) {
        const postData = {
          imageUrl: cloudinaryData.url,
          id: userDetails,
        };

        await uploadPostToServer(postData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPostToServer = async (post) => {
    try {
      console.log(post.id, "Hey");
      const data = await fetchData(API_TO_EDIT_PROFILE_PHOTO, "POST", post);
      if (!data.error) {
        if (!post.id) {
          await updateLocalStorage(data.body);
          cancelModal();
          console.log("Post saved successfully");
        }
      } else {
        setServerErrors([data.error]);
        setErrors([]);
      }
    } catch (error) {
      setServerErrors([error]);
    } finally {
      window.location.reload(); // Refresh the page
      setIsLoading(false);
    }
  };

  const updateLocalStorage = async (user) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  }

  const cancelModal = () => {
    setPost({
      image: null,
    });

    // Reset the file input field
    const fileInput = document.getElementById("image");
    if (fileInput)
      fileInput.value = null;

    setErrors([]);
    setServerErrors([]);

    const modalInstance = M.Modal.getInstance(createPostModal.current); //close modal
    modalInstance.close();
  };

  return (
    <>
      <div id="editProfilePicModal" className="modal" ref={createPostModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update profile photo</h4>

              <FontAwesomeIcon
                icon={faTimes}
                className="close"
                onClick={cancelModal}
              />
            </div>

            <form
              className="modal-body"
              id="createPostform"
              name="createPostform"
              method="POST"
              onSubmit={editProfilePhoto}
            >
              {serverErrors?.length > 0 && (
                <ul className="error-list text-danger">
                  {serverErrors.map((error, index) => (
                    <li key={index}>{error.toString()}</li>
                  ))}
                </ul>
              )}

              <div className="form-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    name="image"
                    onChange={handleOnChange}
                  />
                  <p className="text-danger small">{errors["image"]}</p>
                </div>
              </div>

              {post.image && (
                <div className="post-image">
                  <img src={URL.createObjectURL(post.image)} alt="Selected" />
                </div>
              )}

              {isLoading ? (
                <div className="loader">Loading...</div>
              ) : (
                <button className="subbtn" type="submit">
                  Change Photo
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default EditProfilePhotoComponent;
