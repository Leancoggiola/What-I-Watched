const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const imdbRoutes = require('./endpoints/imdb/routes.js');
const listRoutes = require('./endpoints/list/routes.js');
const metadataRoutes = require('./endpoints/metadata/routes.js');

// Constants
const PORT = process.env.PORT || 8000;
const app = express();
require('dotenv').config()

// DB config
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err.message));

// Configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
app.use('/api/imdb', imdbRoutes)
app.use('/api/list', listRoutes)
app.use('/api/meta', metadataRoutes)

// Deploy config
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.join(__dirname, 'client', 'build','index.html')));
}

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

app.listen(PORT, () => {
    console.log(`Serve at http://localhost:${PORT}`);
});