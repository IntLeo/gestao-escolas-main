import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // ou 8081 se você mudou
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
