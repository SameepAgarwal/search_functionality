import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Beer');
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  useEffect(() => {
    setLoadingAnimation(true);
    if (searchTerm === "") {
      alert("Type something...");
      return;
    }
    axios.get(`https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`)
      .then((response) => {
        setBeers(response.data);
        setLoadingAnimation(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert("Error");
        setLoadingAnimation(false);
      });
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Punk API Beer List</h1>
      <input
        type="text"
        placeholder="Search by beer name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        loadingAnimation ?
          <div><i className="fa-solid fa-spinner fa-spin-pulse"></i></div> :
          <div className="beer-list">
            {beers.map((beer) => (
              <div className="beer-card" key={beer.id}>
                <img src={beer.image_url} alt={beer.name} />
                <h2>{beer.name}</h2>
                <p>{beer.description}</p>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default App;
