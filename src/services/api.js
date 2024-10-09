import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-backend-pi-six.vercel.app/", 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;