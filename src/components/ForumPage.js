import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore"; 
import { app } from '../firebase'; 
import './style.css'; // Import your styles for the forum page
import './forum.css';

const db = getFirestore(app); // Initialize Firestore

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    author: 'Anonymous', // Default author
  });

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle form submission to add a new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const postWithTimestamp = {
      ...newPost,
      timestamp: serverTimestamp(), // Use server timestamp for consistency
    };

    try {
      await addDoc(collection(db, 'posts'), postWithTimestamp);
      setNewPost({ title: '', content: '', category: '', author: 'Anonymous' }); // Clear form after submission
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="forum-page">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="logo">Group 2</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/forum" id="forum-link" className="active">Forum</Link>
          <a href="#local-matching">Local Matching</a>
          <a href="#plan-food-tour">Plan Food Tour</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="auth-links">
          <a href="#sign-up">Sign Up</a>
          <a href="#log-in">Log In</a>
        </div>
      </div>

      {/* Forum Content */}
      <div className="forum-container">
        <form onSubmit={handlePostSubmit}>
          <h2>Create a New Post</h2>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={newPost.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="lich-su-mon-an">#lịch sử món ăn</option>
              <option value="quan-an-ngon">#quán ăn ngon</option>
              <option value="cong-thuc">#công thức</option>
              <option value="cach-lam-mon-an">#cách làm món ăn</option>
              <option value="pho-bien">#phổ biến</option>
              <option value="trending">#trending</option>
            </select>
          </div>

          <button type="submit">Post</button>
        </form>
      </div>

      <div className="posts-list">
        <h3>Recent Posts</h3>
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p><strong>Category:</strong> {post.category}</p>
              <p>{post.content}</p>
              <small><em>Posted by {post.author}</em></small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
