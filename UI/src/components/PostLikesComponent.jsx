import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_FETCH_POST_LIKES } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PostLikesComponent = (props) => {
    const postLikesModal = useRef(null);
    const [likesList, setLikesList] = useState([]);

    useEffect(() => {
        fetchPostLikes();
        M.Modal.init(postLikesModal.current);
    }, [props]);


    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(postLikesModal.current);
        modalInstance.close()
    };

    const fetchPostLikes = async () => {
        const { selectedPostId } = props;
        console.log(selectedPostId, "postLikes");
        try {
            const data = await fetchData(API_TO_FETCH_POST_LIKES, "POST", { _id: selectedPostId });
            console.log(data.body.postLikes, "The list");
            setLikesList(data.body.postLikes);
        } catch (error) {
            console.log("Error:", error);
        }
    };


    return (
        <>
            <div id="postLikesModal" className="modal" ref={postLikesModal}>
                <div className="modal-content">
                    <div className="modal-close">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={closeModal}
                        />
                    </div>

                    {likesList.map(likesData => (
                        <ul className="collection">
                            <span>{likesData?.username}</span>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostLikesComponent;
