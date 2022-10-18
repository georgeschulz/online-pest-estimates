import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";
import { createWidget, getWidgetById, updateDetails, updateProposal, updateStrategy } from "../api/widgetApi";

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
        const { strategyType, widgetId } = data;
        const response = await updateStrategy(widgetId, null, strategyType);
        return response.data;
    }
)

export const updateWidgetDetails = createAsyncThunk(
    'widgets/updateWidgetDetails',
    async (data, thunkAPI) => {
        const { widgetId } = data; 
        const state = thunkAPI.getState();
        const d = state.widgets.draft;
        const response = await updateDetails(widgetId, {
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

export const updateWidgetProposalConfig = createAsyncThunk(
    'widgets/updateWidgetProposalConfig',
    async (data, thunkAPI) => {
        const { widgetId } = data;
        const state = thunkAPI.getState();
        const { legal, covered, notCovered, targetFull } = state.widgets.draft;
        const response = await updateProposal(widgetId, { legal, covered, notCovered, targetFull });
        return response.data;
    }
)

export const getWidgetByIdReload = createAsyncThunk(
    'widgets/getWidgetById',
    async (widgetId, thunkAPI) => {
        const response = await getWidgetById(widgetId);
        return response.data
    }
)

const widgetSlice = createSlice({
    name: 'widgets',
    initialState: {
        widgets: [],
        selectedWidget: null,
        widgetError: { isVisible: false, message: '', isSuccess: false },
        draft: {
            name: null,
            programDescription: null,
            targets: [],
            benefitOne: null,
            benefitTwo: null,
            benefitThree: null,
            frequency: 'Quarterly',
            billing: [{type: 'Monthly Billing Program', allowed: false}, {type: 'Annual Billing', allowed: false}, {type: 'Billed After Service', allowed: false}],
            image: null,
            covered: [],
            notCovered: [],
            targetFull: [],
            legal: null
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
        removeCovered: (state, action) => {
            const newCovereds = state.draft.covered.filter(cover => cover != action.payload.tag);
            state.draft.covered = newCovereds;
        },
        removeNotCovered: (state, action) => {
            const newNotCovereds = state.draft.notCovered.filter(cover => cover != action.payload.tag);
            state.draft.notCovered = newNotCovereds;
        },
        removeTargetFull: (state, action) => {
            const newTargets = state.draft.targetFull.filter(target => target != action.payload.tag)
            state.draft.targetFull = newTargets;
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

        builder.addCase(updateWidgetProposalConfig.fulfilled, (state, action) => {
            state.selectedWidget = action.payload.data;
        })

        builder.addCase(getWidgetByIdReload.fulfilled, (state, action) => {
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
export const selectCovered = state => state.widgets.draft.covered;
export const selectNotCovered = state => state.widgets.draft.notCovered;
export const selectTargetFull = state => state.widgets.draft.targetFull;
export const selectLegal = state => state.widgets.draft.legal;
export const selectParameters = state => state.widgets.selectedWidget
export const selectIsWidgetLoaded = state => state.widgets.selectedWidget != null
export const { updateDraft, removeTarget, toggleBilling, removeCovered, removeNotCovered, removeTargetFull } = widgetSlice.actions;
export default widgetSlice.reducer;