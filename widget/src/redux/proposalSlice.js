import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProposal = createAsyncThunk(
    'proposal/createProposal',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/widget/${data.widget_id}/create-proposal`, data);
        return response.data;
    }
);

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        isLoading: false,
        isSent: false,
        proposalId: null,
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
export const { toggleSent } = proposalSlice.actions;
export default proposalSlice.reducer;