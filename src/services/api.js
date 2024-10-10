import axios  from "axios";

const api = axios.create({
  baseURL: "https://e-commerse-liard.vercel.app", 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;