import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types';
import {USER_SERVER} from '../components/Config';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data)
        .catch((err) => console.log(err));
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) { 
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data)
        .catch((err) => console.log(err));

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data)
        .catch((err) => console.log(err));

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logout() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data)
        .catch((err) => console.log(err));

    return {
        type: LOGOUT_USER,
        payload: request
    }
}
