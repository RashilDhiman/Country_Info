import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated to match backend
});

export const searchCountries = (name: string) =>
  api.get(`/countries`, { params: { name } });

export const getCountryDetail = (code: string) =>
  api.get(`/countries/${code}`);

export default api; 