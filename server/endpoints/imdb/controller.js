import axios from 'axios';
import lodash from 'lodash';
const { pick } = lodash;

const defaultOptions = {
    url: 'https://online-movie-database.p.rapidapi.com',
    params: {limit: '5', titleType: 'tvSeries,movie'},
    headers: {
      'X-RapidAPI-Key': '11797de419msh557864eba0d9d55p112880jsn82c94a8b6dd7', // Replace later
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };


export const getContent = async (req, res) => {
    try {
        const { method, query } = req;
        const options = { 
            ...defaultOptions,
            url: `${defaultOptions.url}/title/v2/find`, 
            method, 
            params: {...defaultOptions.params, ...query} 
        }
    
        const {status, data} =  await axios.request(options);
        const resBody = data?.results ? data.results.map(item => {
            item.id = item.id.replace('title','').replaceAll('/','');
            return pick(item, ['id', 'title', 'image', 'titleType'])
        }) : [];

        res.status(status).send(resBody)
    } catch(e) {
        const {response: {status} = {},message = ''} = e;
        
        res.status(status).send(message)
    }
}

export const getOverviewDetails = async (req, res) => {
    try {
        const { method, query } = req;
        const options = { 
            ...defaultOptions,
            url: `${defaultOptions.url}/title/get-overview-details`, 
            method, 
            params: { ...query } 
        }
    
        const {status, data} =  await axios.request(options);
        if(data?.id) {
            const resBody = {
                title: data?.title?.title,
                type: data?.title?.titleType,
                releaseYear: data?.title?.year,
                rating: data?.ratings?.rating,
                genres: data?.genres,
                summary: data?.plotSummary?.text ? data.plotSummary.text : data?.plotOutline?.text
            }
            res.status(status).send(resBody)
        } else throw new Error(`No se encontro el contenido con id ${query.tconst}`)

    } catch(e) {
        const {response: {status} = {},message = ''} = e;
        
        res.status(status).send(message)
    }
}