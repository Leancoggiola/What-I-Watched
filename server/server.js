import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import imdbRoutes from './endpoints/imdb/routes.js';
import listRoutes from './endpoints/list/routes.js';
import metadataRoutes from './endpoints/metadata/routes.js';

// Constants
const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();

// DB config
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err.message));

// Configuration
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Routing
app.use('/imdb', imdbRoutes)
app.use('/list', listRoutes)
app.use('/meta', metadataRoutes)

// Deploy config
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Serve at http://localhost:${PORT}`);
});