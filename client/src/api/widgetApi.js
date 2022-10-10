import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const createWidget = async () => {
    return await axios.post(`${endpoint}/widget`);
}