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
        const resBody = data?.results ? data.results.map(item => 
            (pick(item, ['id', 'title', 'image', 'titleType'])
        )) : [];

        res.status(status).send(resBody)
    } catch(e) {
        const {response: {status} = {},message = ''} = e;
        
        res.status(status).send(message)
    }
}