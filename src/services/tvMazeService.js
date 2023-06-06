// tvMazeService.js
const API_URL = 'https://api.tvmaze.com/search/shows?q=all';

export const fetchShows = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const shows = data.map((item) => item.show);
    return shows;
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
};