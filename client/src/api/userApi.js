import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getUser = async () => {
    return await axios.get(`${endpoint}/user`);
}

export const createBusiness = async (businessData) => {
    return await axios.post(`${endpoint}/user/business`, businessData);
}

export const updateBusiness = async (businessData) => {
    return await axios.put(`${endpoint}/user/business`, businessData);
}

export const updateUser = async (userData) => {
    return await axios.put(`${endpoint}/user`, userData);
}

export const getUserWidgets = async () => {
    return await axios.get(`${endpoint}/user/widgets`);
}