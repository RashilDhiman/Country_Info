import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.29.77:5000/api', // Updated to use local network IP for device access
});

export const searchCountries = (name: string) =>
  api.get(`/countries`, { params: { name } });

export const getCountryDetail = (code: string) =>
  api.get(`/countries/${code}`);

export default api; 