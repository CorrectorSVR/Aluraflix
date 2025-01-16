import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6786d853f80b78923aa85619.mockapi.io/api/v1/Videos', 
});

export default api;
