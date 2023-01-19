const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
})
const statusSchema = mongoose.Schema({
    order: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    style: { type: Object}
})

const appSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true},
    image: { type: imageSchema, required: true },
    style: { type: Object}
})

module.exports = {
    statusSchema: statusSchema,
    appSchema: appSchema,
    AppModel: mongoose.model('apps', appSchema),
    StatusModel: mongoose.model('status', statusSchema),
}