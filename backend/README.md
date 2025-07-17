# Country Info Backend

This is the backend for the Country Info Mobile App. It acts as a proxy to the REST Countries API and provides endpoints for searching and retrieving country details.

## Structure (MVC)
- `controllers/` — Business logic for handling requests (see `countryController.js`).
- `routes/` — Route definitions (see `countryRoutes.js`).
- `models/` — (Optional) Data models for future use.
- `index.js` — App entry point, sets up Express and mounts routes.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the server:
   ```sh
   node index.js
   ```
   The server will run on port 5000 by default. You can set a custom port using the `PORT` environment variable.

## API Endpoints

### Search Countries
- **GET** `/api/countries?name={country_name}`
- Returns a list of countries matching the search name.

### Country Details
- **GET** `/api/countries/{country_code}`
- Returns detailed information for a specific country by code (e.g., US, IN, etc.).

## Notes
- This backend proxies requests to the [REST Countries API](https://restcountries.com/).
- Handles errors and provides meaningful error messages for invalid requests or API failures. 