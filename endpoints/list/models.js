const { Schema, model } = require('mongoose');

const listSchema = Schema({
    contentList: [Object],
    user: { type: String, required: true }
})

const ListModel = model('lists', listSchema);

module.exports =  ListModel;
