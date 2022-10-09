import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getUser = async () => {
    return await axios.get(`${endpoint}/user`);
}

export const createBusiness = async (businessData) => {
    return await axios.post(`${endpoint}/user/business`, businessData);
}