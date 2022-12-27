import mongoose from 'mongoose';

import { appSchema, statusSchema} from '../metadata/models.js';

const contentSchema = mongoose.Schema({
    _id: { type: String, required: true }, 
    title: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    app: { type: appSchema, required: true },
    status: { type: statusSchema, required: true }
})

const listSchema = mongoose.Schema({
    movies: [contentSchema],
    series: [contentSchema],
    user: { type: String, required: true }
})

const ListModel = mongoose.model('lists', listSchema);

export default ListModel;