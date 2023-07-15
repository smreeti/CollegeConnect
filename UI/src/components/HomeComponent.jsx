import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faFaceMeh, faUser } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header.jsx';
import fetchData from "../../utils/FetchAPI.js";
import { API_TO_FETCH_ALL_POSTS, API_TO_LIKE_UNLIKE_POST } from '../../utils/APIRequestUrl.js';
import { Link } from 'react-router-dom';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            iconColor: "silver",
            isLiked: false,
            likes: 0
        };
    }


    likedIcon = (postId) => {
        const { iconColor, likes } = this.state;

        if (iconColor === "silver") {
            this.setState({ iconColor: 'red', isLiked: true });
        }

        else {
            this.setState({ iconColor: 'silver', isLiked: false })
        }
        this.fetchLikesCount(postId);
    };


    componentDidMount() {
        this.fetchAllPosts();
    }

    async fetchAllPosts() {
        try {
            const data = await fetchData(API_TO_FETCH_ALL_POSTS, "POST");
            console.log("The data", data.body);
            this.setState({
                posts: data.body
            })
            console.log(this.state.posts);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async fetchLikesCount(postId) {
        try {
            const data = await fetchData(API_TO_LIKE_UNLIKE_POST, "PUT", { id: postId });
            if (data) {
                const newList = Object.values(data.body);
                console.log(newList, "New list");

                if (newList) {
                    this.setState({
                        posts: newList
                    })
                }
                console.log("Check the posts", this.state.posts);

            }
        } catch (error) {
            console.error('Error here:', error);
        }
    }

    render() {
        const { posts, iconColor } = this.state;
        return (
            <>
                <Header />
                <div style={{ background: '#F5F5DC', marginTop: '3rem' }}>

                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className='py-1' key={post._id}>
                                <div className='col-lg-4 col-md-8 col-10 mx-auto card my-3 px-0'>
                                    <div className="card-header px-2">
                                        <p className='my-0 d-flex align-items-center text-fluid'>
                                            <FontAwesomeIcon icon={faUser} className='me-md-2 me-1' />
                                            <Link>{post.postedBy.username}</Link>
                                        </p>
                                    </div>

                                    <div style={{ padding: '8px 0', maxHeight: '400px' }}>
                                        <Link>
                                            <img src={post.imageUrl} alt="Post" className='card-img-top' style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }} />
                                        </Link>

                                    </div>
                                    <div className='card-body'>
                                        <div className="me-auto">
                                            <div className="d-flex flex-wrap">
                                                <Link onClick={() => this.likedIcon(post._id)}>
                                                    <FontAwesomeIcon icon={faHeart} className='me-3' color={iconColor} />
                                                </Link>
                                                <Link>
                                                    <FontAwesomeIcon icon={faComment} />
                                                </Link>
                                            </div>
                                            {post.likes.length > 0 ? <small className='fs-6 fw-lighter'>Liked by {post.likes.length} people</small> : null}
                                        </div>
                                        <div className="d-flex flex-wrap ">
                                            <p className='fw-bold my-1 me-1 text-wrap'>{post.postedBy.username} </p> <p className='fw-light my-1'> {post.caption}</p>
                                        </div>
                                        <div className="d-flex fs-6">
                                            <small><FontAwesomeIcon icon={faUser} className='me-1' /> <input type="text" className='border-0' placeholder='Add a commment...' /></small>
                                        </div>
                                        <Link>
                                            <div>
                                                {post._id}
                                                {post.comments > 0 && <small>View {post.comments} comments</small>}
                                            </div>
                                        </Link>
                                        <small>
                                            {formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="main-container" style={{ background: '#F5F5DC' }}>
                            <div className="col-lg-6 col-12 p-3 px-md-5 py-md-4 card">
                                <div className="text-center">
                                    {/* <Link to='/'>
                                        <img className="login-logo" src="../../assets/logo.png" />
                                    </Link> */}
                                    <p className='mt-md-5 mt-2'>
                                        <FontAwesomeIcon icon={faFaceMeh} size='3x' color='#008080' />

                                    </p>
                                    <h2 className="fs-2" style={{ color: '#008080' }}>
                                        Sorry No Post Yet!
                                    </h2>
                                    <Link className="mt-md-4 mt-3" >
                                        <small>Follow others to see their posts</small>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    )
                    }
                </div>
            </>
        );
    }
}