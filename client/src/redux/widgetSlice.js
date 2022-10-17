import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";
import { createWidget, updateDetails, updateStrategy } from "../api/widgetApi";

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

export const updateWidgetDetails = createAsyncThunk(
    'widgets/updateWidgetDetails',
    async (data, thunkAPI) => { 
        const state = thunkAPI.getState();
        const d = state.widgets.draft;
        console.log('good')
        const response = await updateDetails(state.widgets.selectedWidget.widgetId, {
            name: d.name,
            description: d.programDescription,
            frequency: d.frequency,
            billingFrequency: d.billing,
            benefitOne: d.benefitOne,
            benefitTwo: d.benefitTwo,
            benefitThree: d.benefitThree,
            targets: d.targets
        })

        return response.data;
    }
)

const widgetSlice = createSlice({
    name: 'widgets',
    initialState: {
        widgets: [],
        selectedWidget: null,
        widgetError: { isVisible: false, message: '', isSuccess: false },
        draft: {
            name: 'Gold Program',
            programDescription: 'Sell the benefits of your program here. Max 250 characters.',
            targets: [],
            benefitOne: 'Write a clear benefit for your service tile.',
            benefitTwo: 'Write a clear benefit for your service tile.',
            benefitThree: 'Write a clear benefit for your service tile.',
            frequency: 'One Time',
            billing: [{type: 'Monthly Billing Program', allowed: true}, {type: 'Annual Billing', allowed: false}, {type: 'Billed After Service', allowed: false}],
            image: null
        }
    },
    reducers: {
        updateDraft: (state, action) => {
            const newData = action.payload;

            state.draft = { 
                ...state.draft, 
                ...newData
            }
        },
        removeTarget: (state, action) => {
            const newTargets = state.draft.targets.filter(target => target != action.payload.tag)
            state.draft.targets = newTargets;
        },
        toggleBilling: (state, action) => {
            const billing = state.draft.billing.find(option => option.type === action.payload)
            billing.allowed = !billing.allowed;
        }
    },
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

        builder.addCase(updateWidgetDetails.fulfilled, (state, action) => {
            state.selectedWidget = action.payload.data;
        })
    }
})

export const selectUserWidgets = state => state.widgets.widgets;
export const selectProgramName = state => state.widgets.draft.name;
export const selectProgramDescription = state => state.widgets.draft.programDescription;
export const selectTargets = state => state.widgets.draft.targets;
export const selectBenefitOne = state => state.widgets.draft.benefitOne;
export const selectBenefitTwo = state => state.widgets.draft.benefitTwo;
export const selectBenefitThree = state => state.widgets.draft.benefitThree;
export const selectFrequency = state => state.widgets.draft.frequency;
export const seelctBilling = state => state.widgets.draft.billing;
export const { updateDraft, removeTarget, toggleBilling } = widgetSlice.actions;
export default widgetSlice.reducer;