const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const countryRoutes = require('./routes/countryRoutes');

app.use(cors());
app.use(express.json());

// Mount country routes
app.use('/api/countries', countryRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Country Info Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 