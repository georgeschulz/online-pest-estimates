import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import paneReducer from './paneSlice';
import configReducer from './configSlice';
import proposalReducer from './proposalSlice';

export default configureStore({
    reducer: {
        contact: contactReducer,
        pane: paneReducer,
        config: configReducer,
        proposal: proposalReducer
    }
});
