import axios from 'axios';

export function serviceCall(requestConfig) {
    const instance = axios.create();

    return instance({...requestConfig})
        .then(response => {
            return response && response.data
        })
        .catch(error => {
            return Promise.reject(error.message)
        })
}