import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
})

export const statusSchema = mongoose.Schema({
    order: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true }
})

export const appSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true},
    image: { type: imageSchema, required: true },
    gradient: { type: String, required: true}
})

export const AppModel = mongoose.model('apps', appSchema);
export const StatusModel = mongoose.model('status', statusSchema);