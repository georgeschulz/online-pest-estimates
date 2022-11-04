import { createSlice } from '@reduxjs/toolkit';

const paneSlice = createSlice({
    name: 'pane',
    initialState: {
        pane: 'start',
        isLoading: false
    },
    reducers: {
        setPane: (state, action) => {
            state.pane = action.payload;
        }
    }
})

export const selectPane = state => state.pane.pane;
export const { setPane } = paneSlice.actions;
export default paneSlice.reducer;