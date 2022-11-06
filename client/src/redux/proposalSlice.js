import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProposal, agreeToProposal, getBranding } from '../api/proposalApi';

export const getProposalThunk = createAsyncThunk(
    'proposal/getProposal',
    async (proposalId) => {
        const response = await getProposal(proposalId);
        return response.data;
    }
)

export const agreeToProposalThunk = createAsyncThunk(
    'proposal/agreeToProposal',
    async (proposalId) => {
        const response = await agreeToProposal(proposalId);
        return response.data;
    }
)

export const getBrandingThunk = createAsyncThunk(
    'proposal/getBranding',
    async (proposalId) => {
        const response = await getBranding(proposalId);
        return response.data;
    }
)

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        isLoading: false,
        proposal: null,
        hexPrimary: '#6A77D9',
        hexSecondary: '#6A77D9',
        businessName: 'Online Pest Estimates'
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
        builder.addCase(agreeToProposalThunk.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(agreeToProposalThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.proposal = action.payload.data;
        });
        builder.addCase(getBrandingThunk.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBrandingThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hexPrimary = action.payload.data.hex_primary;
            state.hexSecondary = action.payload.data.hex_secondary;
            state.businessName = action.payload.data.name;
        })
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
export const selectHexPrimary = state => '#' + state.proposal.hexPrimary;
export const selectHexSecondary = state => '#' + state.proposal.hexSecondary;
export const selectBusinessName = state => state.proposal.businessName;
export const selectIsLoading = state => state.proposal.isLoading;
export default proposalSlice.reducer;