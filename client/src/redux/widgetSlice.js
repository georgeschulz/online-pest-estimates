import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWidgets } from "../api/userApi";
import { createWidget, getWidgetById, updateDetails, updateProposal, updateStrategy, updateStrategyConfig, deleteWidgetById, toggleActiveWidget } from "../api/widgetApi";

export const getUserWidgetList = createAsyncThunk(
    'widgets/getWidgets',
    async (thunkAPI) => {
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
    'widgets/setWidgetStrategy',
    async (data, thunkAPI) => {
        const { strategyType, widgetId } = data;
        const response = await updateStrategy(widgetId, null, strategyType);
        return response.data;
    }
)

export const updateWidgetStrategy = createAsyncThunk(
    'widgets/updateWidgetStrategy',
    async (data, thunkAPI) => {
        const { widgetId } = data;
        const state = thunkAPI.getState();
        const { config } = state.widgets.selectedWidget.pricingStrategy;
        const { pricingStrategyType } = state.widgets.selectedWidget;
        const response = await updateStrategyConfig(widgetId, config, pricingStrategyType);
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
            targets: d.targets,
            image: d.image
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

export const deleteWidget = createAsyncThunk(
    'widgets/deleteWidget',
    async (widgetId) => {
        const response = await deleteWidgetById(widgetId);
        return response.data;
    }
)

export const publishWidget = createAsyncThunk(
    'widget/publishWidet',
    async (widgetId) => {
        const response = await toggleActiveWidget(widgetId);
        return response.data;
    }
)

const widgetSlice = createSlice({
    name: 'widgets',
    initialState: {
        widgets: [],
        selectedWidget: null,
        isWidgetListLoading: false,
        widgetError: { isVisible: false, message: '', isSuccess: false },
        draft: {
            name: '',
            programDescription: '',
            targets: [],
            benefitOne: '',
            benefitTwo: '',
            benefitThree: '',
            frequency: 'Quarterly',
            billing: [{ type: 'Monthly Billing Program', allowed: false }, { type: 'Annual Billing', allowed: false }, { type: 'Billed After Service', allowed: false }],
            image: 'https://onlinepestestimates.herokuapp.com/images/banner.JPG',
            imageFile: null,
            covered: [],
            notCovered: [],
            targetFull: [],
            legal: ''
        },
        isWidgetReloading: false
    },
    reducers: {
        updateDraft: (state, action) => {
            const newData = action.payload;

            state.draft = {
                ...state.draft,
                ...newData
            }
        },
        updateImageFile: (state, action) => {
            state.draft.imageFile = action.payload;
        },
        updateImage: (state, action) => {
            state.draft.image = action.payload;
        },
        updateConfig: (state, action) => {
            state.selectedWidget.pricingStrategy.config = action.payload;
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
        },
        updateBase: (state, action) => {
            state.selectedWidget.pricingStrategy.config.base = action.payload;
            state.selectedWidget.pricingStrategy.startsAt = action.payload;
        },
        updateConfigTargets: (state, action) => {
            const containsTargetParameter = state.selectedWidget.pricingStrategy.config.parameterConfig.some(parameter => parameter.name === 'How much more would you like to charge for each possible target they say they are seeing?')
            
            if (containsTargetParameter) {
                const targetConfig = state.selectedWidget.pricingStrategy.config.parameterConfig.find(parameter => parameter.name === 'How much more would you like to charge for each possible target they say they are seeing?');
                const index = state.selectedWidget.pricingStrategy.config.parameterConfig.indexOf(targetConfig);
                const newOptions = action.payload.map(target => {
                    return { option: target, value: 0 }
                });
                console.log(newOptions)

                state.selectedWidget.pricingStrategy.config.parameterConfig[index].options = newOptions
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserWidgetList.fulfilled, (state, action) => {
            state.widgets = [...action.payload.data];
            state.isWidgetListLoading = false;
        });

        builder.addCase(getUserWidgetList.pending, (state, action) => {
            state.isWidgetListLoading = true;
        })

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

        builder.addCase(updateWidgetStrategy.fulfilled, (state, action) => {
            state.selectedWidget = action.payload.data;
        })

        builder.addCase(deleteWidget.fulfilled, (state, action) => {
            state.widgets = state.widgets.filter(widget => widget.widget_id != action.payload.data.widgetId)
        })

        builder.addCase(publishWidget.fulfilled, (state, action) => {
            const widgetToUpdate = state.widgets.find(widget => widget.widget_id == action.payload.data.widgetId);
            const index = state.widgets.indexOf(widgetToUpdate);
            state.widgets[index].active = !state.widgets[index].active;
        })
    }
})

export const selectUserWidgets = state => state.widgets.widgets;
export const selectIsWidgetListLoading = state => state.widgets.isWidgetListLoading;
export const selectProgramName = state => state.widgets.draft.name;
export const selectProgramDescription = state => state.widgets.draft.programDescription;
export const selectTargets = state => state.widgets.draft.targets;
export const selectBenefitOne = state => state.widgets.draft.benefitOne;
export const selectBenefitTwo = state => state.widgets.draft.benefitTwo;
export const selectBenefitThree = state => state.widgets.draft.benefitThree;
export const selectBenefitList = state => [state.widgets.draft.benefitOne, state.widgets.draft.benefitTwo, state.widgets.draft.benefitThree];
export const selectFrequency = state => state.widgets.draft.frequency;
export const seelctBilling = state => state.widgets.draft.billing;
export const selectCovered = state => state.widgets.draft.covered;
export const selectNotCovered = state => state.widgets.draft.notCovered;
export const selectTargetFull = state => state.widgets.draft.targetFull;
export const selectLegal = state => state.widgets.draft.legal;
export const selectImage = state => state.widgets.draft.image;
export const selectImageFile = state => state.widgets.draft.imageFile;
export const selectParameters = state => state.widgets.selectedWidget
export const selectIsWidgetLoaded = state => state.widgets.selectedWidget != null
export const selectConfig = state => state.widgets.selectedWidget ? state.widgets.selectedWidget.pricingStrategy.config : null;
export const selectConfigParameters = state => state.widgets.selectedWidget != null ? state.widgets.selectedWidget.pricingStrategy.config.parameterConfig : null;
export const selectBase = state => state.widgets.selectedWidget != null ? state.widgets.selectedWidget.pricingStrategy.config.base : null;
export const selectTargetOptionList = state => state.widgets.selectedWidget != null &&  state.widgets.selectedWidget.pricingStrategy.config.parameterConfig.some(parameter => parameter.name === 'How much more would you like to charge for each possible target they say they are seeing?') ? state.widgets.selectedWidget.pricingStrategy.config.parameterConfig.find(parameter => parameter.name === 'How much more would you like to charge for each possible target they say they are seeing?').options : null;
export const { updateDraft, removeTarget, toggleBilling, removeCovered, removeNotCovered, removeTargetFull, updateConfig, updateBase, updateConfigTargets, updateImage, updateImageFile } = widgetSlice.actions;
export default widgetSlice.reducer;


//.pricingStrategy.config.parameterConfig.find(parameter => parameter.name === 'How much more would you like to charge for each possible target they say they are seeing?')