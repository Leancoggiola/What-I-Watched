const axios = require('axios');
const { pick } = require('lodash');


const getOptions = () => ({
    url: process.env.RAPID_API_URL,
    params: {limit: '5', titleType: 'tvSeries,movie'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST
    }
  });

module.exports = {
    getContent: async (req, res) => {
        try {
            const { method, query } = req;
            const options = getOptions();
            options.url = `${options.url}/title/v2/find`;
            options.method = method;
            options.params = {...options.params, ...query}
            const {status, data} =  await axios.request(options);
            console.log(options)
            const resBody = data?.results ? data.results.map(item => {
                item.id = item.id.replace('title','').replaceAll('/','');
                return pick(item, ['id', 'title', 'image', 'titleType'])
            }) : [];
            console.log("LLEGO ACA 4")
            res.status(status).send(resBody)
        } catch(e) {
            const {response: {status} = {},message = ''} = e;
            
            res.status(status).send(message)
        }
    },

    getOverviewDetails: async (req, res) => {
        try {
            const { method, query } = req;
            const options = getOptions();
            options.url = `${options.url}/title/get-overview-details`;
            options.method = method;
            options.params = { ...query }
        
            const {status, data} =  await axios.request(options);
            if(data?.id) {
                const resBody = {
                    title: data?.title?.title,
                    type: data?.title?.titleType,
                    releaseYear: data?.title?.year,
                    rating: data?.ratings?.rating,
                    genres: data?.genres,
                    imageUrl: data?.title?.image?.url,
                    summary: data?.plotSummary?.text ? data.plotSummary.text : data?.plotOutline?.text
                }
                res.status(status).send(resBody)
            } else throw new Error(`No se encontro el contenido con id ${query.tconst}`)
    
        } catch(e) {
            const {response: {status} = {},message = ''} = e;
            
            res.status(status).send(message)
        }
    }
}