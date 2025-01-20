import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostDetails.css';

function PostDetail({ posts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Async function to fetch post and its comments based on the post ID
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if the post exists in the local state
                const localPost = posts.find(p => p.id.toString() === id);
                if (localPost) {
                    setPost(localPost);
                } else {
                    // If the post is not found locally, fetch it from the API
                    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                    setPost(postResponse.data);
                }

                // Fetch comments for the post from the API 
                const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load post or comments');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, posts]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="post-detail error">
                <p>Post not found!</p>
            </div>
        );
    }

    return (
        <div className="post-detail">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="post-frame">
                <div className="post-content">
                    <h1>{post.title}</h1>
                    <p className="post-body">{post.body}</p>
                </div>
            </div>

            <div className="comments-frame">
                <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.length === 0 ? (
                        <p className="no-comments">No comments yet</p>
                    ) : (
                        <ul className="comments-list">
                            {comments.map(comment => (
                                <li key={comment.id} className="comment">
                                    <h4>{comment.name}</h4>
                                    <p className="comment-email">By: {comment.email}</p>
                                    <p className="comment-body">{comment.body}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );

}

export default PostDetail;
