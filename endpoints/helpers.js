const multiparty = require('multiparty');
const fs = require('fs');
const { isEmpty } = require('lodash');

module.exports = {
    uploadImage: (req) => {
        return new Promise((resolve, reject) => {
            const form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                if(err) {
                    reject(err);
                }
                let body = {};
                if(!isEmpty(fields)) {
                    body = {...JSON.parse(fields.data[0])}
                }
                if(!isEmpty(files)) {
                    body = {
                        ...body,
                        image: {
                            name: files.img[0].originalFilename,
                            data: fs.readFileSync(files.img[0].path),
                            contentType: files.img[0].headers['content-type']
                        }
                    };
                }
                resolve(body)
            })
        })
    }
}