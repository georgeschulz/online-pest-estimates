import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const onLogin = async (email, password) => {
    return await axios.post(`${endpoint}/auth/login`, {email, password});
}

export const onLogout = async () => {
    return await axios.post(`${endpoint}/auth/logout`);
}

export const onSignup = async (email, password) => {
    return await axios.post(`${endpoint}/auth/register`, {email, password});
}

export const onGoogleSignIn = async () => {
    return await axios.get(`${endpoint}/auth/login-google`);
}