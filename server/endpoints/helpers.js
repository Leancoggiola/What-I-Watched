import multiparty from 'multiparty';
import * as fs from 'fs';
import _ from "lodash";

export const uploadImage = (req) => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            if(err) {
                reject(err);
            }
            let body = {};
            if(!_.isEmpty(fields)) {
                body = {...JSON.parse(fields.data[0])}
            }
            if(!_.isEmpty(files)) {
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