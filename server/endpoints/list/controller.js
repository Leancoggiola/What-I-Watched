import pkg from 'lodash';
const { isEmpty } = pkg;

import ListModel from "./models.js";

export const getList = async (req, res) => {
    const { user } = req.query
    try {
        const list = await ListModel.findOne({ user });
        if(isEmpty(list)) {
            const newList = new ListModel({ user });
            await newList.save();
            res.status(201).json(newList)
        } else {
            res.status(200).json(list)
        }
    } catch(e) {
        console.log(e)
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const postItemToList = async (req, res) => {
    try {
        const { user, content } = req.body;
        const list = await ListModel.findOne({ user });

        content.type === 'movie' ? list.movies.push(content) : list.series.push(content)
        list.save();

        res.status(204).json(list)
    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const deleteItemFromList = async (req, res) => {
    try {
    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const putChangeItemStatus = async (req, res) => {
    try {
    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}