import axios from 'axios';

export const searchApi = async (searchQuery, url) => {
  try {
    const response = await axios.get(`${url}`, {
      params: { query: searchQuery },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};
