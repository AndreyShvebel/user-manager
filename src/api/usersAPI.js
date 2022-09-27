import axios from "axios";

const backEndUrlForReq = 'https://emphasoft-test-assignment.herokuapp.com'

export const token = localStorage.getItem('token') && localStorage.getItem('token')

const instance = axios.create({
    baseURL: backEndUrlForReq,
    headers: {
        'content-type': 'application/json',
    }
})

export const usersAPI = {
    authorize(data) {
        return (
            instance.post('/api-token-auth/', {username: data.username, password: data.password})
                .then(response => {
                    return response
                })
                .catch(error => {
                    if (error.response) {
                        return error.response
                    }
                })
        )
    },
    getUsers(userToken) {
        return (
            axios.get('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Token ${userToken}`
                }
            }).then(response => {
                return response
            })
            .catch(error => {
                if (error.response) {
                    return error.response
                }
            })
        )
    },
    getUserById(id, userToken) {
        return (
            axios.get(`https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${id}/`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Token ${userToken}`
                }
            }).then(response => {
                return response
            })
            .catch(error => {
                if (error.response) {
                    return error.response
                }
            })
        )
    },
    createUser(userData) {
        return (
            axios.post('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
            userData,
            {headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${userData.userToken}`
            }}).then(response => {
                return response
            })
            .catch(error => {
                if (error.response) {
                    return error.response
                }
            })
        )
    },
    modifyUser(userData) {
        console.log(userData)
        return (
            axios.patch(`https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${userData.id}/`,
            userData,
            {headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${userData.userToken}`
            }}).then(response => {
                return response
            })
            .catch(error => {
                if (error.response) {
                    return error.response
                }
            })
        )
    }
}