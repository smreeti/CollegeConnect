import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faHeartCircleMinus, faUser } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header.jsx';
import fetchData from "../../utils/FetchAPI.js";
import { getLoggedInUser } from '../../utils/Auth.js';
import { API_TO_FETCH_ALL_POSTS } from '../../utils/APIRequestUrl.js';
import { Link } from 'react-router-dom';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            iconColor: "silver"
        };
    }

    likedIcon = () => {
        const { iconColor } = this.state;
        const newColor = iconColor === 'silver' ? 'red' : 'silver';
        this.setState({ iconColor: newColor });
    };

    componentDidMount() {
        this.fetchAllPosts();
    }

    async fetchAllPosts() {
        try {
            const data = await fetchData(API_TO_FETCH_ALL_POSTS, "POST");
            this.setState({
                posts: data.body
            })
        } catch (error) {
            console.log("Error:", error);
        }
    }

    render() {
        const { posts } = this.state;
        const { iconColor } = this.state;
        return (
            <>
                <Header />
                <div className='bg-light'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className='row my-5'>
                                <div key={post._id} className='col-lg-4 col-md-8 col-10 mx-auto card'>
                                    <div className="card-header px-2">
                                        <p className='my-0 d-flex align-items-center text-fluid'>
                                            <FontAwesomeIcon icon={faUser} className='me-md-2 me-1' />
                                            <Link>{post.postedBy.username}</Link>
                                        </p>
                                    </div>
                                    <Link>
                                        <img src={post.imageUrl} alt="Post" className='card-img-top' />
                                    </Link>
                                    <div className='card-body'>
                                        <div className="me-auto">
                                            <div className="d-flex flex-wrap">
                                                <FontAwesomeIcon icon={faHeart} className='me-3' color={iconColor} onClick={this.likedIcon} />
                                                <FontAwesomeIcon icon={faComment} />
                                            </div>
                                            {post.likes > 0 ? <small className='fs-6 fw-lighter'>Liked by {post.likes} people</small> : null}
                                        </div>
                                        <div className="d-flex flex-wrap ">
                                            <p className='fw-bold my-1 me-1 text-wrap'>{post.postedBy.username} </p> <p className='fw-light my-1'> {post.caption}</p>
                                        </div>
                                        <div className="d-flex fs-6">
                                            {post.comments === 0 ? <small><FontAwesomeIcon icon={faUser} className='me-1' /> <input type="text" className='border-0' placeholder='Add a commment...' /></small> : post.comments}

                                        </div>
                                        <small>
                                            {formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })}
                                        </small>
                                    </div>
                                </div>
                            </div >
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )
                    }
                </div >
            </>
        );
    }
}
