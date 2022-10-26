import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import widgetSlice from './widgetSlice';
import billingSlice from './billingSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        widgets: widgetSlice,
        billing: billingSlice
    }
})