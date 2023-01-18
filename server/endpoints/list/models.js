import { Schema, model } from 'mongoose';

const listSchema = Schema({
    contentList: [Object],
    user: { type: String, required: true }
})

const ListModel = model('lists', listSchema);

export default ListModel;
