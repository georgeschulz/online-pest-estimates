import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";

export const getUserWidgetList = createAsyncThunk(
    'widgets/getWidgets',
    async(thunkAPI) => {
        const response = await getUserWidgets();
        return response.data;
    }
)

const widgetSlice = createSlice({
    name: 'widgets',
    initialState: {
        widgets: [],
        selectedWidget: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWidgetList.fulfilled, (state, action) => {
            state.widgets = [...action.payload.data];
        })
    }
})

export const selectUserWidgets = state => state.widgets.widgets;
export default widgetSlice.reducer;