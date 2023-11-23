const express = require('express')
const app = express()
const port = process.env.port || 8080
const routes = require('./src/routes/appRoute');
const uploadRoutes = require('./src/routes/multerRoute');
const artworkRoutes = require('./src/routes/artworkRoute');
require('dotenv').config();
const multerRoute = require('./src/routes/multerRoute');
app.use('/api/artworks', multerRoute);

app.use(express.json());
app.use('/', routes);
app.use('/upload', uploadRoutes);
app.use('/api', artworkRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).send('Internal Server Error');
});

