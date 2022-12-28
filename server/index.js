import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import imdbRoutes from './endpoints/imdb/routes.js';
import listRoutes from './endpoints/list/routes.js';
import metadataRoutes from './endpoints/metadata/routes.js';

// Constants
const PORT = process.env.PORT || 3001;
const app = express();
const CONNECTION_URL = 'mongodb+srv://leanco:EaFQJ1gOWYeZJAGH@whatisaw-personal.3wvmhlp.mongodb.net/?retryWrites=true&w=majority'

// Configuration

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Routing
app.use('/imdb', imdbRoutes)
app.use('/list', listRoutes)
app.use('/meta', metadataRoutes)

// DB config
mongoose.set('strictQuery', true)
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('Server listening on', PORT)))
    .catch((err) => console.error(err.message));