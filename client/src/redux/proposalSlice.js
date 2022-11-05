import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProposal } from '../api/proposalApi';

export const getProposalThunk = createAsyncThunk(
    'proposal/getProposal',
    async (proposalId) => {
        const response = await getProposal(proposalId);
        return response.data;
    }
) 

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        isLoading: false,
        proposal: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProposalThunk.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProposalThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.proposal = action.payload.data;
        });
    }
});

export const selectProposal = state => state.proposal.proposal;
export const selectProgram = state => state.proposal.proposal !== null ? state.proposal.proposal.program_name : '';
export const selectLegal = state => state.proposal.proposal !== null ? state.proposal.proposal.legal : '';
export const selectDescription = state => state.proposal.proposal !== null ? state.proposal.proposal.description : '';
export const selectDidAgree = state => state.proposal.proposal !== null ? state.proposal.proposal.did_agree : '';
export const selectRecurringPrice = state => state.proposal.proposal !== null ? state.proposal.proposal.recurring_price : '';
export const selectBillingFrequency = state => state.proposal.proposal !== null ? state.proposal.proposal.billing_frequency : '';
export const selectFrequency = state => state.proposal.proposal !== null ? state.proposal.proposal.frequency : '';
export const selectSetup = state => state.proposal.proposal !== null ?  state.proposal.proposal.setup : '';
export const selectProposalId = state => state.proposal.proposal !== null ? state.proposal.proposal.proposal_id : '';
export const selectCovered = state => state.proposal.proposal !== null ? state.proposal.proposal.covered : [];
export const selectNotCovered = state => state.proposal.proposal !== null ? state.proposal.proposal.not_covered : [];
export const selectTargetList = state => state.proposal.proposal !== null ? state.proposal.proposal.target_list.split(',') : [];
export default proposalSlice.reducer;