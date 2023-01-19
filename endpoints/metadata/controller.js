const { uploadImage } = require('../helpers.js');
const { AppModel, StatusModel  } = require('./models.js');


module.exports = {
    // Status
    getStatusList: async (req, res) => {
        try {
            StatusModel.find()
                .then(statusList => res.status(200).json(statusList))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 404).json({ message: e.message })
        }
    },

    postNewStatus: async (req, res) => {
        try {
            const { body } = req;
            const newStatus = new StatusModel(body);
            newStatus.save()
                .then(status => res.status(201).json(status))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 404).json({ message: e.message })
        }
    },

    deleteStatus: async (req, res) => {
        try {
            const { body } = req;
            StatusModel.remove(body)
                .then(() => res.status(200).json('Deleted successfully'))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 400).json({ message: e.message })
        }
    },

    putChangeStatus: async (req, res) => {
        try {
            const { body } = req;
            StatusModel.updateOne({ _id: body._id}, body)
                .then(() => res.status(200).json('Updated successfully'))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 400).json({ message: e.message })
        }
    },

    // App's
    getAppList: async (req, res) => {
        try {
            AppModel.find()
                .then(appList => res.status(200).json(appList))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 404).json({ message: e.message })
        }
    },

    postNewApp: async (req, res) => {
        try {
            const body = await uploadImage(req);
            const newApp = new AppModel({
                ...body,
                name: body.name.toLowerCase().replaceAll(' ',''),
                displayName: body.name
            });
            newApp.save()
                .then(() => res.status(201).json({ message: 'The app was successfully uploaded'}))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 400).json({ message: e.message })
        }
    },

    deleteApp: async (req, res) => {
        try {
            const { params: { _id} } = req;
            AppModel.remove(_id)
                .then(() => res.status(200).json('Deleted successfully'))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch(e) {
            res.status(e?.status ? e.status : 400).json({ message: e.message })
        }
    },

    putChangeApp: async (req, res) => {
        try {
            const { query: { id} } = req;
            let body = await uploadImage(req);
            if(body?.name) {
                body = {
                    ...body,
                    name: body.name.toLowerCase().replaceAll(/\W/g,''),
                    displayName: body.name
                }
            }
            AppModel.findByIdAndUpdate(id, body, (err) => {
                if(err) res.status(400).json({ message: err.message })
                else res.status(200).json('Updated successfully')
                return
            })
        } catch(e) {
            res.status(e?.status ? e.status : 400).json({ message: e.message })
        }
    }
}
