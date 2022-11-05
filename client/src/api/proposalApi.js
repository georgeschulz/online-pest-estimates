import { endpoint } from './config';
import axios from 'axios';
//axios.defaults.withCredentials = false

export const getProposal = async (proposalId) => {
    return await axios.get(`${endpoint}/proposal/${proposalId}`);
}

export const agreeToProposal = async (proposalId) => {
    return await axios.put(`${endpoint}/proposal/${proposalId}/agree`);
}