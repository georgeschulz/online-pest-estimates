import { endpoint } from './config';
import axios from 'axios';
//axios.defaults.withCredentials = true;

export const createStripeSession = async () => {
    return await axios.post(`${endpoint}/billing/create-session`);
}