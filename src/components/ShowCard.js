import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ShowCard = ({ show }) => {
  const summaryText = show.summary || '';
  const tempElement = document.createElement('div');
  tempElement.innerHTML = summaryText;
  const plainTextSummary = tempElement.innerText;

  return (
    <div className="show-card">
      <h2>{show.name}</h2>
      <img src={show.image?.medium} alt={show.name} />
      <p>{plainTextSummary}</p>
      <Link to={`/summary/${show.id}`}>
        <button>View Summary</button>
      </Link>
    </div>
  );
};

export default ShowCard;