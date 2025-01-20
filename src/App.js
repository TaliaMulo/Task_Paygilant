import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetails';
import AddPostForm from './components/AddPostForm';
import './App.css';

function App() {
  // State to hold the list of posts
  const [posts, setPosts] = useState([]);

  // Function to add new post to the state
  const addPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList posts={posts} setPosts={setPosts} />} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
          <Route path="/add" element={<AddPostForm addPost={addPost} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;