import mongoose from 'mongoose';

export const statusSchema = mongoose.Schema({
    order: { type: Number, require: true, unique: true },
    name: { type: String, require: true, unique: true }
})

export const appSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    displayName: { type: String, require: true}
})

export const AppModel = mongoose.model('apps', appSchema);
export const StatusModel = mongoose.model('status', statusSchema);