import React from 'react'

function Cover() {
  return (
    <>
      // Change the cover image to a new one
      <div className="cover-image">
        <img src="https://example.com/new-cover-image.jpg" alt="New Cover" />
      </div>
      <div className="cover-text">
        <h1>Welcome to the Admin Page</h1>
        <p>Manage your users and settings here.</p>
      </div>
      <style jsx>{`
        .cover-image img {
          width: 100%;
          height: auto;
        }
        .cover-text {
          text-align: center;
          margin-top: 20px;
        }
        .cover-text h1 {
          font-size: 2.5rem;
          color: #333;
        }
        .cover-text p {
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>
    </>
  )
}

export default Cover
