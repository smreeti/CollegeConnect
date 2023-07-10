import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faFaceMeh, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header.jsx';
import fetchData from "../../utils/FetchAPI.js";
import { API_TO_FETCH_ALL_POSTS } from '../../utils/APIRequestUrl.js';
import { Link } from 'react-router-dom';
import ReportComponent from './ReportComponent.jsx';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            iconColor: "silver",
            isReportModalOpen: false,
            isLoading: false,
            selectedPostId: ''
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
            this.setIsLoading();

            const data = await fetchData(API_TO_FETCH_ALL_POSTS, "POST");
            this.setState({
                posts: data.body
            })
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

    render() {
        const { posts, isLoading, iconColor } = this.state;
        return (
            <>
                <Header />
                <div style={{ background: '#F5F5DC', marginTop: '3rem' }}>

                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div className='py-1' key={post._id}>
                                <div className='col-lg-4 col-md-8 col-10 mx-auto card my-3 px-0'>
                                    <div className="card-header px-2">
                                        <p className='my-0 d-flex align-items-center text-fluid'>
                                            <FontAwesomeIcon icon={faUser} className='me-md-2 me-1' />
                                            <Link>{post.postedBy.username}</Link>

                                            <FontAwesomeIcon icon={faEllipsisH}
                                                className="ms-auto modal-trigger"
                                                data-target="reportModal"
                                                onClick={() => this.openReportModal(post?._id)} />
                                        </p>
                                    </div>

                                    <div style={{ padding: '8px 0', maxHeight: '400px' }}>
                                        <Link>
                                            <img src={post.imageUrl} alt="Post" className='card-img-top'
                                                style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }} />
                                        </Link>

                                    </div>
                                    <div className='card-body'>
                                        <div className="me-auto">
                                            <div className="d-flex flex-wrap">
                                                <FontAwesomeIcon icon={faHeart} className='me-3'
                                                    color={iconColor} onClick={this.likedIcon} />
                                                <FontAwesomeIcon icon={faComment} />
                                            </div>
                                            {post.likes > 0 ? <small className='fs-6 fw-lighter'>Liked by {post.likes} people</small> : null}
                                        </div>
                                        <div className="d-flex flex-wrap ">
                                            <p className='fw-bold my-1 me-1 text-wrap'>{post.postedBy.username} </p>
                                            <p className='fw-light my-1'> {post.caption}</p>
                                        </div>
                                        <div className="d-flex fs-6">
                                            <small><FontAwesomeIcon icon={faUser} className='me-1' />
                                                <input type="text" className='border-0' placeholder='Add a commment...' />
                                            </small>
                                        </div>
                                        <Link>
                                            <div>
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
                        isLoading ? <div className="loader">Loading...</div> : (
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
                    <ReportComponent
                        selectedPostId={this.state.selectedPostId}
                    />}
            </>
        );
    }
}