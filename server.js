import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import imdbRoutes from './endpoints/imdb/routes.js';
import listRoutes from './endpoints/list/routes.js';
import metadataRoutes from './endpoints/metadata/routes.js';

// Constants
const PORT = process.env.PORT || 3001;
const app = express();
const CONNECTION_URL = process.env.MONGO_URI;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Routing
app.use('/imdb', imdbRoutes)
app.use('/list', listRoutes)
app.use('/meta', metadataRoutes)

// Deploy config
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

// DB config
mongoose.set('strictQuery', true)
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('Server listening on', PORT)))
    .catch((err) => console.error(err.message));