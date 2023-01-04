import pkg from 'lodash';
const { isEmpty } = pkg;

import { AppModel, StatusModel } from '../metadata/models.js'
import ListModel from './models.js';

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
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const postItemToList = async (req, res) => {
    try {
        const { user, content } = req.body;

        const userList  = await ListModel.findOne({user});
        const appObj = await AppModel.findOne({ name: content.app})
        const statusObj= await StatusModel.findOne({ name: content.status})

        if( !appObj || !statusObj ) {
            res.status(404).json({message: 'Bad Request - App/Status no validos' })
            return
        }

        if(!userList.contentList.some(item => item.title === content.title)) {
            userList.contentList.push(content)
            await userList.save()
            res.status(200).json({ message: 'Se agrego correctamente', newList: userList })
            return
        }

        res.status(400).json({message: 'El contenido ya se encuentra en la lista' })

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