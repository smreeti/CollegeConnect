import React, { useRef, useEffect, useState } from "react";
import Header from "../Header.jsx";
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

const CreatePostComponent = () => {
  const [post, setPost] = useState({
    caption: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);

  const createPostModal = useRef(null);

  useEffect(() => {
    M.Modal.init(createPostModal.current);
  }, []);

  const handleOnChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setPost((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    const form = document.forms.createPostform;
    const post = {
      caption: form.caption.value,
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
          caption: post.caption,
          imageUrl: cloudinaryData.url,
        };

        await uploadPostToServer(postData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPostToServer = async (post) => {
    try {
      const data = await fetchData(API_TO_SAVE_POST, "POST", post);
      if (!data.error) {
        resetForm();
        console.log("Post saved successfully");
      } else {
        setServerErrors([data.error]);
        setErrors([]);
      }
    } catch (error) {
      setServerErrors([error]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPost({
      caption: "",
      image: null,
    });
    setErrors([]);
    setServerErrors([]);
  };

  const cancelModal = () => {
    // Logic to close the modal
  };

  return (
    <>
      <Header />
      <div id="modal1" className="modal" ref={createPostModal}>

        <div className="modal-content fix-upload-button">
        <div className="modalcross">
          <div className="modal-header modalsubdiv">
            <h4 className="posting">Create New Post</h4>
           
          </div>
          <FontAwesomeIcon
              icon={faTimes}
              className="modal-close modalsubdiv"
              onClick={cancelModal}
            />

      </div>
          <form
            className=""
            id="createPostform"
            name="createPostform"
            method="POST"
            onSubmit={createPost}
          >
            {serverErrors.length > 0 && (
              <ul className="error-list text-danger">
                {serverErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}

            <div>
             

              <div>

                <div className="uploadimgset"><img src="../../assets/uploadicon.png" /></div>    

                 <div className="drag">   
              
                <input className="choosefile" type="file" name="image" onChange={handleOnChange} />
                <p className="text-danger small mb-3">{errors["image"]}</p>
                </div>
              </div>
              

              <div className="capdiv">

             
              
              <textarea
                  type="text"
                  placeholder="caption"
                  name="caption"
                  className="caption"
                  value={post.caption}
                  onChange={handleOnChange}
              />


              </div>    

              {post.image && (
                <div className="post-image">
                  <img src={URL.createObjectURL(post.image)} alt="Selected" />
                </div>
              )}

              {isLoading ? (
                <div className="loader">Loading...</div>
              ) : (
                <div className="btndiv">
                <button className="btnblack btnpost" type="submit">Submit post</button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostComponent;
