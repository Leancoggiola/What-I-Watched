const { isEmpty } = require('lodash');

const { AppModel, StatusModel } = require('../metadata/models.js')
const ListModel = require('./models.js');

module.exports = {
    getList: async (req, res) => {
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
    },
    
    postItemToList: async (req, res) => {
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
    },
    
    deleteItemFromList: async (req, res) => {
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
    },
    
    putChangeItemOnList: async (req, res) => {
        try {
            const { user, content } = req.body;
    
            ListModel.findOneAndUpdate(
                {'user': user,'contentList.title': content.title}, 
                {'$set': {
                    'contentList.$.appName': content.appName,
                    'contentList.$.appDisplayName': content.appDisplayName,
                    'contentList.$.status': content.status,
                }},
                {new: true},
                (err, newList) => {
                    if(err) res.status(400).json({ message: 'Bad Request - El item no se encuentra en la lista' })
                    else res.status(200).json({ message: 'Actualizado correctamente', newList: newList })
                })
    
        } catch(e) {
            res.status(e?.status ? e.status : 404).json({ message: e.message })
        }
    }
}
