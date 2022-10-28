import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStripeSession } from "../api/billingApi";
import { getStripePortal } from "../api/billingApi";

export const createSession = createAsyncThunk(
    'billing/createStripeSession',
    async () => {
        const response = await createStripeSession();
        return response.data;
    }
)

export const getStripePortralLink = createAsyncThunk(
    'billing/getStripePortal',
    async (data) => {
        const response = await getStripePortal(data.route);
        return response.data;
    }
)

const billingSlice = createSlice({
    name: 'billing',
    initialState: {
        isBilled: false
    },
    reducers: {}
})

export default billingSlice.reducer;