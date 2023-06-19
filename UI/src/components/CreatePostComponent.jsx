import React from "react";
import Header from "../Header.jsx";
import { CLOUD_NAME, CLOUD_URL, UPLOAD_PRESET } from "../../utils/CloudinaryConfig.js";
import { post } from "../../../API/routes/routes.js";
import { API_TO_SAVE_POST } from "../../utils/APIRequestUrl.js";

class CreatePostComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            post: {
                caption: "",
                image: null
            }
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handleOnChange = event => {
        const { name, value, files } = event.target;

        if (name === "image") {
            this.setState(prevState => ({
                post: {
                    ...prevState.post,
                    image: files[0]
                }
            }));
        } else {
            this.setState(prevState => ({
                post: {
                    ...prevState.post,
                    [name]: value
                }
            }));
        }
    };

    createPost = async (e) => {
        e.preventDefault();

        const form = document.forms.createPostform;
        const post = {
            caption: form.caption.value,
            image: form.image.files[0]
        }

        await uploadPostToCloudinary(post);
    }
    
    uploadPostToCloudinary = async (post) => {
        const data = new FormData();
        data.append("file", post.image);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);

        try {
            const res = await fetch(CLOUD_URL, {
                method: "POST",
                body: data
            });

            const cloudinaryData = await res.json();

            if (cloudinaryData.url) {
                const postData = {
                    caption: post.caption,
                    imageUrl: cloudinaryData.url
                };

                await this.uploadPostToServer(postData);
            }
        } catch (err) {
            console.log(err);
        }
    };


    uploadPostToServer = async (post) => {
        try {
            const data = await fetchData(API_TO_SAVE_POST, "POST", post);
            if (!data.error) {
                console.log("Post saved successfully");
            } else {
                // this.setServerErrors(data.error);
                // this.setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
            // this.setServerErrors(error);
        }
    }

    render() {
        const {
            post: { caption, image }
        } = this.state;

        return (
            <>
                <Header />
                <form className="" id="createPostform" name="createPostform" method="POST" onSubmit={this.createPost}>
                    <div>
                        <input
                            type="text"
                            placeholder="caption"
                            name="caption"
                            value={caption}
                            onChange={this.handleOnChange}
                        />

                        <div className="file-field input-field">
                            <div>
                                <span>Upload Image</span>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={this.handleOnChange}
                                />
                            </div>
                        </div>

                        {image && (
                            <div className="post-image">
                                <img src={URL.createObjectURL(image)} alt="Selected" />
                            </div>
                        )}

                        <button type="submit">Submit post</button>
                    </div>
                </form>
            </>
        );
    }
}

export default CreatePostComponent;
