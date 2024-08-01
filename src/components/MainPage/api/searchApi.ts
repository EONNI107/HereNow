import axios from 'axios';

export const searchApi = async (
  searchQuery: string,
  url: string,
  id: number = 15,
) => {
  try {
    const response = await axios.get(`${url}`, {
      params: { query: searchQuery, contentId: id },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};
