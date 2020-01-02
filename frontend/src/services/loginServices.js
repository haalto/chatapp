import axios from 'axios'

const baseUrl = '/login'

const login = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default {
    login
}