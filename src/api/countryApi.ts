import axios from 'axios';

const api = axios.create({
  baseURL: 'https://country-info-2.onrender.com/api', // Updated to use Render backend URL
});

export const searchCountries = (name: string) =>
  api.get(`/countries`, { params: { name } });

export const getCountryDetail = (code: string) =>
  api.get(`/countries/${code}`);

export default api; 