import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import widgetSlice from './widgetSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        widgets: widgetSlice    
    }
})