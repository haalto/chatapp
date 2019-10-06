import axios from 'axios'

const baseUrl = 'http://localhost:3001/login'

const login = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default {
    login
}