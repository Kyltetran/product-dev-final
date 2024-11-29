// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import VietnamMap from './VietnamMap';
import './style.css'; // Import your CSS for styling

const HomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle button click
    const handleButtonClick = () => {
      navigate('/forum'); // Navigate to /forum when button is clicked
    };
    
return (
    <div className="homepage">
    {/* Navigation Bar */}
    <div className="navbar">
        <div className="logo">Group 2</div>
            <div className="nav-links">
                <a href="#home" className="active">Home</a>
                <a href="/forum" id="forum-link">Forum</a>
                <a href="#local-matching">Local Matching</a>
                <a href="#plan-food-tour">Plan Food Tour</a>
                <a href="#pricing">Pricing</a>
            </div>
            <div className="auth-links">
                <a href="#sign-up">Sign Up</a>
                <a href="#log-in">Log In</a>
        </div>
    </div>

    {/* Introduction Section */}
    <div className="intro-container">
        <h1>Interactive Vietnam Map</h1>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        consequuntur natus voluptate in, ea ex, ab quo necessitatibus laudantium,
        vero totam provident perspiciatis? Odio quo, repudiandae quas nihil
        ducimus laudantium? Esse ipsa ab numquam accusamus eveniet nisi corporis
        consequatur autem.
        </p>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        consequuntur natus voluptate in, ea ex, ab quo necessitatibus laudantium,
        vero totam provident perspiciatis? Odio quo, repudiandae quas nihil
        ducimus laudantium? Esse ipsa ab numquam accusamus eveniet nisi corporis
        consequatur autem.
        </p>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        consequuntur natus voluptate in, ea ex, ab quo necessitatibus laudantium,
        vero totam provident perspiciatis? Odio quo, repudiandae quas nihil
        ducimus laudantium? Esse ipsa ab numquam accusamus eveniet nisi corporis
        consequatur autem.
        </p>
    </div>

    {/* Question Section */}
    <div class="question-container">
        <h2>What are you looking for?</h2>
        <div class="buttons">
            <button id="regions-exploration">Regions Exploration</button>
            <button id="discussion" onClick={handleButtonClick}>Discussion</button>
            <button id="local-matching">Local Matching</button>
            <button id="food-tour-planning">Food Tour Planning</button>
        </div>
    </div>

    <div class="map-wrapper">
        <div class="map-container" id="map">
            <div id="svg-container"></div>
            <div id="tooltip" class="tooltip"></div>
        </div>

        <div class="info-container">
            <h2>This is the map that you can...</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, quibusdam alias, dolore aut recusandae odit sapiente quasi deleniti obcaecati praesentium voluptatibus doloremque omnis accusamus assumenda odio culpa ab atque sed.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus tempora labore amet unde consectetur aut quia eligendi? Deleniti impedit alias tenetur molestias aliquam fugiat possimus laudantium ab? Molestias, ratione!</p>

            <div class="search-container">
                <input type="text" id="region-search" placeholder="Search for a region..." />
                <button id="search-button">Search</button>
            </div>
        </div>
    </div>

    <div id="region-modal" class="modal">
        <div class="modal-content">
            <span id="close-modal" class="close">&times;</span>
            <p id="modal-content">Region information will appear here.</p>
        </div>
    </div>

    <div className="map-container">
        <VietnamMap /> {/* Embed the VietnamMap component */}
    </div>

    {/* <div id="region-details" style="display: none;">
        <div id="VN-HN">
            <h2>Hà Nội</h2>
            <p>Welcome to Hà Nội, the capital of Vietnam! Known for its rich history, culture, and bustling streets.</p>
            <div class="popup-map" id="hanoi-map-container">
                <img src="regions/hanoi.svg" alt="Hà Nội" class="hanoi-map-img" />
            </div>
            <button onclick="alert('Explore Hanoi!')">Explore More</button>
        </div>
        <div id="VN-32">
            <h2>Phú Yên</h2>
            <p>Welcome to Phú Yên, known for its stunning beaches and breathtaking landscapes!</p>
        </div>
        <div id="VN-27">
            <h2>Quảng Nam</h2>
            <p>Welcome to Quảng Nam, home of Hội An Ancient Town and My Son Sanctuary!</p>
        </div>
    </div> */}
    
    {/* Add any other sections you'd like, e.g., features, about, etc. */}
    </div>
);
};

export default HomePage;
