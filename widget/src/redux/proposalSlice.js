import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProposal = createAsyncThunk(
    'proposal/createProposal',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/public-widget/${data.widget_id}/create-proposal`, data);
        return response.data;
    }
);

export const agreeToProposalThunk = createAsyncThunk(
    'proposal/agreeToProposal',
    async (widgetId) => {
        const response = await axios.put(`http://localhost:4000/public-widget/proposal/${widgetId}/agree`);
        return response.data;
    }
)

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        isLoading: false,
        isSent: false,
        proposal: null
    },
    reducers: {
        toggleSent: (state, action) => {
            state.isSent = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProposal.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createProposal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.proposalId = action.payload.proposal_id;
            state.proposal = action.payload.data;
        });
    }
});

export const selectIsProposalSent = state => state.proposal.isSent;
export const selectProposalId = state => state.proposal.proposal != null ? state.proposal.proposal.proposal_id : null; 
export const { toggleSent } = proposalSlice.actions;
export default proposalSlice.reducer;