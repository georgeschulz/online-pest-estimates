import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const createWidget = async () => {
    return await axios.post(`${endpoint}/widget`);
}

export const updateStrategy = async (widgetId, config, strategyType) => {
    return await axios.put(`${endpoint}/widget/${widgetId}/price-strategy`, {config, strategyType});
}