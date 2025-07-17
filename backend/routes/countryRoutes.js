const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// Search countries
router.get('/', countryController.searchCountries);
// Get country details
router.get('/:code', countryController.getCountryDetails);

module.exports = router; 