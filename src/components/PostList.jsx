import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList({ posts, setPosts }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch posts from API only if the posts array is empty
        if (posts.length === 0) {
            axios.get('https://jsonplaceholder.typicode.com/posts') // Fetch posts from the API
                .then(response => {
                    setPosts(response.data); // Update posts state with the fetched data
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setErrorMessage('Failed to load posts. Please try again later.');
                });
        } else {
            setLoading(false);
        }
    }, [setPosts, posts.length]);

    // Update the search term state with user input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter posts based on the search term
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="post-list-container">
            <h1 className="page-title">Post Hub</h1>
            <div className="search-bar-container">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search By Title..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
            </div>
            <div className="add-post-link">
                <Link to="/add">Add New Post</Link>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading post...</p>
                </div>
            ) : (
                <div className="post-cards-container">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="post-card">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <Link to={`/posts/${post.id}`}>View Post </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostList;


