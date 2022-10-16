import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";
import { createWidget, updateStrategy } from "../api/widgetApi";

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

export const setWidgetStrategy = createAsyncThunk(
    'widgets/updateWidgetStrategy',
    async (data, thunkAPI) => {
        const { strategyType } = data;
        const state = thunkAPI.getState();
        const response = await updateStrategy(state.widgets.selectedWidget.widgetId, null, strategyType);
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

        builder.addCase(setWidgetStrategy.fulfilled, (state, action) => {
            state.selectedWidget = action.payload.data;
        })
    }
})

export const selectUserWidgets = state => state.widgets.widgets;
export default widgetSlice.reducer;