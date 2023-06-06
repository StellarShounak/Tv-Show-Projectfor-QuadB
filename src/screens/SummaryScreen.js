import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShows } from '../services/tvMazeService';
import './SummaryScreen.css';

const SummaryScreen = () => {
  const { showId } = useParams();
  const [summary, setSummary] = useState('');
  const [showName, setShowName] = useState('');
  const [bookingFormVisible, setBookingFormVisible] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      const shows = await fetchShows();
      const show = shows.find((show) => show.id === Number(showId));
      const summaryText = show?.summary || '';
      const tempElement = document.createElement('div');
      tempElement.innerHTML = summaryText;
      const plainTextSummary = tempElement.innerText;
      setSummary(plainTextSummary);
      setShowName(show?.name || '');
    };

    fetchSummary();
  }, [showId]);

  const handleOpenBookingForm = () => {
    setBookingFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const movieName = formData.get('movieName');

    // Store user details in local/session storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('movieName', movieName);

    // Clear form fields
    event.target.reset();

    // Optional: Redirect or perform additional actions
  };

  return (
    <div>
      <h2>Summary</h2>
      <p className="summary">{summary}</p>
      <button onClick={handleOpenBookingForm}>Book Movie Ticket for {showName}</button>

      {bookingFormVisible && (
        <form className="booking-form" onSubmit={handleFormSubmit}>
          <h3>Movie Ticket Booking</h3>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" required />
          <input type="text" name="movieName" value={showName} readOnly />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SummaryScreen;
