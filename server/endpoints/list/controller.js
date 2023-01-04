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
        const appObj = await AppModel.findOne({ name: content.appName})
        const statusObj= await StatusModel.findOne({ name: content.status})

        if( !appObj || !statusObj ) {
            res.status(404).json({message: 'Bad Request - App/Status no validos' })
            return
        }

        if(!userList.contentList.some(item => item.title === content.title)) {
            userList.contentList.push(content)
            await userList.save()
            res.status(200).json({ message: 'Agregado correctamente', newList: userList })
            return
        }

        res.status(400).json({message: 'El contenido ya se encuentra en la lista' })

    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const deleteItemFromList = async (req, res) => {
    try {
        const { user, name } = req.body;

        const userList  = await ListModel.findOne({user});

        const contentIndex = userList.contentList.findIndex(item => item.title === name)

        if(contentIndex > -1) {
            userList.contentList.splice(contentIndex, 1);
            await userList.save()
        }

        res.status(200).json({ message: 'Eliminado correctamente', newList: userList })

    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}

export const putChangeItemOnList = async (req, res) => {
    try {
        const { user, content } = req.body;

        const userList  = await ListModel.findOne({user});

        const contentIndex = userList.contentList.findIndex(item => item.title === content.name)

        if(contentIndex > -1) {
            if(content.appName && content.appDisplayName) {
                userList.contentList[contentIndex].appName = content.appName
                userList.contentList[contentIndex].appDisplayName = content.appDisplayName
            }
            if(content.status) {
                userList.contentList[contentIndex].status = content.status
            }
            await userList.save()
            res.status(200).json({ message: 'Actualizado correctamente', newList: userList })
            return
        } else {
            res.status(400).json({ message: 'Bad Request - El item no se encuentra en la lista' })
            return
        }

    } catch(e) {
        res.status(e?.status ? e.status : 404).json({ message: e.message })
    }
}