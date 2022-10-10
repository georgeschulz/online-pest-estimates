import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";
import { createWidget } from "../api/widgetApi";

export const getUserWidgetList = createAsyncThunk(
    'widgets/getWidgets',
    async(thunkAPI) => {
        const response = await getUserWidgets();
        return response.data;
    }
)

export const createEmtpyWidget = createAsyncThunk(
    'widgets/createWidget',
    async (thunkAPI) => {
        const response = await createWidget();
        return response.data;
    }
)

const widgetSlice = createSlice({
    name: 'widgets',
    initialState: {
        widgets: [],
        selectedWidget: null,
        widgetError: { isVisible: false, message: '', isSuccess: false }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWidgetList.fulfilled, (state, action) => {
            state.widgets = [...action.payload.data];
        });

        builder.addCase(createEmtpyWidget.fulfilled, (state, action) => {
            state.selectedWidget = action.payload.data;
        })
    }
})

export const selectUserWidgets = state => state.widgets.widgets;
export default widgetSlice.reducer;