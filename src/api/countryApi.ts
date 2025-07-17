import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Update with your backend URL
});

export const searchCountries = (name: string) =>
  api.get(`/countries`, { params: { name } });

export const getCountryDetail = (code: string) =>
  api.get(`/countries/${code}`);

export default api; 