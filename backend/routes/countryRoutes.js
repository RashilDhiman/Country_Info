const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://restcountries.com';

// Search countries
router.get('/', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Country name is required.' });
  }
  const apiUrl = `${BASE_URL}/name/${encodeURIComponent(name)}`;
  console.log('Calling API:', apiUrl);
  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);
    const countries = response.data.map(country => ({
      name: country.name.common,
      flag: country.flags?.png || country.flags?.svg,
      population: country.population,
      cca2: country.cca2,
      cca3: country.cca3,
      region: country.region
    }));
    res.json(countries);
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'No countries found.' });
    } else {
      res.status(500).json({ error: 'Failed to fetch countries.' });
    }
  }
});

// Get country details
router.get('/:code', async (req, res) => {
  const { code } = req.params;
  if (!code) {
    return res.status(400).json({ error: 'Country code is required.' });
  }
  const apiUrl = `${BASE_URL}/alpha/${encodeURIComponent(code)}`;
  console.log('Calling API:', apiUrl);
  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);
    const country = response.data[0];
    if (!country) {
      return res.status(404).json({ error: 'Country not found.' });
    }
    res.json({
      name: country.name.common,
      flag: country.flags?.png || country.flags?.svg,
      population: country.population,
      capital: country.capital?.[0] || '',
      region: country.region,
      subregion: country.subregion,
      languages: country.languages ? Object.values(country.languages) : [],
      currencies: country.currencies ? Object.values(country.currencies).map(c => c.name) : [],
      borders: country.borders || [],
      area: country.area,
      cca2: country.cca2,
      cca3: country.cca3
    });
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Country not found.' });
    } else {
      res.status(500).json({ error: 'Failed to fetch country details.' });
    }
  }
});

module.exports = router; 