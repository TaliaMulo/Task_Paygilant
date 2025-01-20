import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPostForm.css';

function AddPostForm({ addPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Make POST request to add new post
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
            userId: 1
        })
            .then(response => {
                setStatus('Post added successfully!');
                addPost(response.data); // Add the new post to state
                setTimeout(() => {
                    navigate('/'); // Navigate back to the post list after 1.5 secodns
                }, 1500);
            })
            .catch(error => {
                setStatus('Failed to add post');
                console.error(error);
            });
    };

    return (
        <div className="add-post-form">
            <button className="back-button-add" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <h1>Add new post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                    required
                />
                <button className="button-add" type="submit">Add Post</button>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}

export default AddPostForm;