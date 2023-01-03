import mongoose from 'mongoose';

import { appSchema, statusSchema} from '../metadata/models.js';

const userSchema = mongoose.Schema({
    movies: [contentSchema],
    series: [contentSchema],
    user: { type: String, required: true }
})

const UserModel = mongoose.model('lists', listSchema);

export default UserModel;