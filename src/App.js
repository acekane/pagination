import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);         
  const [loading, setLoading] = useState(false);   
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;                         

  
  useEffect(() => {
    setLoading(true); 
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [currentPage]); 
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Simple Pagination and Loading effect</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ margin: "10px 0" }}>
              <h2>{post.id}</h2>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: "0 15px" }}>Page {currentPage}</span>
        <button onClick={() => handlePageChange(1)} disabled={posts.length < itemsPerPage}>Next</button>
      </div>
    </div>
  );
};

export default App;