import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faFaceMeh, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header.jsx';
import fetchData from "../../utils/FetchAPI.js";
import { API_TO_FETCH_ALL_POSTS, API_TO_LIKE_UNLIKE_POST } from '../../utils/APIRequestUrl.js';
import { Link } from 'react-router-dom';
import ReportModalComponent from './ReportModalComponent.jsx';
import PostDetailComponent from './PostDetailComponent.jsx';

export default class HomeComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            iconColor: "silver",
            isReportModalOpen: false,
            isLoading: false,
            selectedPostId: '',
            isUserPostOpen: false,
            userDetail: ''
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
            this.setIsLoading();

            const data = await fetchData(API_TO_FETCH_ALL_POSTS, "POST");
            console.log("The data", data.body);
            this.setState({
                posts: data.body
            })
            console.log(this.state.posts);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            this.setIsLoading();
        }
    }

    openReportModal = (postId) => {
        this.setState(prevState => ({
            isReportModalOpen: !prevState.isReportModalOpen,
            selectedPostId: postId
        }));
    }

    setIsLoading() {
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
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

    handleImageClick = (post) => {
        const { _id, postedBy } = post;
        this.setState({
            isUserPostOpen: true,
            selectedPostId: _id,
            userDetail: postedBy
        });
    };

    render() {
        const { posts, isLoading, iconColor } = this.state;
        return (
            <>
                <Header />
                <div className='home-main-container'>

                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div className='py-1' key={post._id}>
                                <div className='col-lg-4 col-md-8 col-10 mx-auto card my-3 px-0'>
                                    <div className="card-header px-2">
                                        <p className='my-0 d-flex align-items-center text-fluid'>
                                            <FontAwesomeIcon icon={faUser} className='me-md-2 me-1' />
                                            <Link to={`/profile/${post.postedBy._id}`}>{post.postedBy.username}</Link>

                                            <FontAwesomeIcon icon={faEllipsisH}
                                                className="ms-auto modal-trigger"
                                                data-target="reportModal"
                                                onClick={() => this.openReportModal(post?._id)} />
                                        </p>
                                    </div>

                                    <div style={{ padding: '8px 0', maxHeight: '400px' }}>
                                        <Link>
                                            <img src={post.imageUrl} alt="Post"
                                                className='card-img-top modal-trigger'
                                                data-target="openUserPost"
                                                style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }}
                                                onClick={() => this.handleImageClick(post)} />
                                        </Link>
                                    </div>

                                    <div className='card-body'>
                                        <div className="me-auto">
                                            <div className="d-flex flex-wrap">
                                                <Link onClick={() => this.likedIcon(post._id)}>
                                                    <FontAwesomeIcon icon={faHeart} className='me-3'
                                                        color={iconColor} />
                                                </Link>
                                                <Link>

                                                    <FontAwesomeIcon icon={faComment}
                                                        className='modal-trigger'
                                                        onClick={() => this.handleImageClick(post)}
                                                        data-target="openUserPost" />
                                                </Link>
                                            </div>
                                            {post.likes.length > 0 ? <small className='fs-6 fw-lighter'>Liked by {post.likes.length} people</small> : null}
                                        </div>

                                        <div className="d-flex flex-wrap ">
                                            <p className='fw-bold my-1 me-1 text-wrap'>{post.postedBy.username} </p>
                                            <p className='fw-light my-1'> {post.caption}</p>
                                        </div>

                                        {/* <div className="d-flex fs-6">
                                            <small><FontAwesomeIcon icon={faUser} className='me-1' />
                                                <input type="text"
                                                    className='border-0'
                                                    placeholder='Add a commment...' />
                                            </small>
                                        </div> */}

                                        <Link
                                            className='modal-trigger'
                                            onClick={() => this.handleImageClick(post)}
                                            data-target="openUserPost">
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
                        isLoading ?
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <p>Loading post...</p>
                            </div>
                            : (
                                <div className="main-container" style={{ background: '#F5F5DC' }}>
                                    <div className="col-lg-6 col-12 p-3 px-md-5 py-md-4 card">
                                        <div className="text-center">
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
                    )
                    }
                </div>

                {this.state?.isReportModalOpen &&
                    <ReportModalComponent
                        selectedPostId={this.state.selectedPostId}
                    />}

                {this.state?.isUserPostOpen && (
                    <PostDetailComponent
                        selectedPostId={this.state.selectedPostId}
                        userDetail={this.state.userDetail}
                    />
                )}
            </>
        );
    }
}