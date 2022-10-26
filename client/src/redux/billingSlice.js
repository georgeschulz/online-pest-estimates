import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStripeSession } from "../api/billingApi";

export const createSession = createAsyncThunk(
    'billing/createStripeSession',
    async () => {
        const response = await createStripeSession();
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