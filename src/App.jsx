import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  // State to control if the landing page is *rendered in the DOM*
  const [renderLandingPage, setRenderLandingPage] = useState(true);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    // When "Get Started" is clicked, we initiate the fade-out.
    // The actual unmounting will happen via onTransitionEnd.
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    // When "Home" is clicked, we immediately ensure the landing page is rendered
    // so its fade-in transition can play.
    setRenderLandingPage(true);
  };

  // This function will be called when the CSS transition on .landing-page ends.
  const handleLandingPageTransitionEnd = () => {
    // If we're transitioning *to* showing the product list (i.e., fading out the landing page)
    if (showProductList) {
      // Once the fade-out is complete, completely remove the landing page from the DOM.
      // This is the key to preventing unwanted whitespace.
      setRenderLandingPage(false);
    }
  };

  return (
    <div className="app-container">
      {/* Conditionally render the landing page based on renderLandingPage state */}
      {renderLandingPage && (
        <div
          className={`landing-page ${showProductList ? 'fade-out' : ''}`}
          onTransitionEnd={handleLandingPageTransitionEnd} // Attach the transition end listener
        >
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}

      {/* The product list is always rendered, but its visibility is controlled by CSS classes */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;