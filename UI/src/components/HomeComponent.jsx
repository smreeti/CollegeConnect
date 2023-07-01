import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Header from '../Header.jsx';
import fetchData from "../../utils/FetchAPI.js";
import { getLoggedInUser } from '../../utils/Auth.js';
import { API_TO_FETCH_ALL_POSTS } from '../../utils/APIRequestUrl.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

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
        return (
            <>
                <Header />

                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id}>
                            <img src={post.imageUrl} alt="Post" className='post-image' />
                            <p>Posted by: {post.postedBy.username}</p>
                            <p>Caption: {post.caption}</p>
                            <p>Likes: {post.likes}</p>
                            <p>Comments: {post.comments}</p>
                            <p>Created date: {formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </>
        );
    }
}
