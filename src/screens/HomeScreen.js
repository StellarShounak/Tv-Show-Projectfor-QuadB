import React, { useEffect, useState } from 'react';
import ShowCard from '../components/ShowCard';
import { fetchShows } from '../services/tvMazeService';
import './HomeScreen.css';

const HomeScreen = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShowData = async () => {
      const data = await fetchShows();
      setShows(data);
    };

    fetchShowData();
  }, []);

  return (
    <div>
      <div className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Shows</a></li>
        </ul>
       
      </div>
      <h1>TV Shows</h1>
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default HomeScreen;


