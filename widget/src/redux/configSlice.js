import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PricingStrategy from '../components/PriceStrategy/PriceStrategy';
import { endpoint } from './config';

export const fetchConfig = createAsyncThunk(
    'config/fetchConfig',
    async (widgetId) => {
       try {
            const response = await axios.get(`${endpoint}/public-widget/${widgetId}`);
            console.log(response.data.data);
            return response.data.data;
       } catch (err) {
        console.log(err)
       }
    }
)

const configSlice = createSlice({
    name: 'config',
    initialState: {
        isLoading: false,
        widget: null,
        form: {},
        quote: null,
        billingOption: 'Monthly Billing Program'
    },
    reducers: {
        setFormValue: (state, action) => {
            state.form[action.payload.name] = action.payload.value;
        },
        submitForm: (state, action) => {
            state.isLoading = true;
            const PriceStrategy = new PricingStrategy(state.widget.pricingStrategy.config);
            const results = {}
            for(let key in state.form) {
                if(Array.isArray(state.form[key])) {
                    results[key] = state.form[key].filter((item) => item.isSelected).map((item) => item.name);
                } else {
                    results[key] = Number(state.form[key]);
                }
            }
            const quote = PriceStrategy.calculate(results);
            state.quote = quote.extract();
         },
            setBillingOption: (state, action) => {
                state.billingOption = action.payload;
            }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConfig.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchConfig.fulfilled, (state, action) => {
            state.isLoading = false;
            state.widget = action.payload;
        })
    }
});

export const selectBenefits = state => state.config.widget != null ? state.config.widget.benefits : [];
export const selectProgramName = state => state.config.widget != null ? state.config.widget.details.program : '';
export const selectProgramSummary = state => state.config.widget != null ? state.config.widget.details.short_description : '';
export const selectStartingPrice = (state) => {
    if (state.config.widget != null && state.config.widget.pricingStrategy.config.billingOptions.includes('monthly')) {
        const base = state.config.widget.pricingStrategy.startsAt;
        let freq = 6;
        switch (state.config.widget.pricingStrategy.config.frequency) {
            case 'Monthly':
                freq = 12;
                break;
            case 'Quarterly':
                freq = 4;
                break;
            case 'Bimonthly':
                freq = 6;
                break;
            case 'One Time':
                freq = 1;
                break;
            default:
                freq = 6;
                break;
        }

        return (base / (12/freq)).toFixed(2);
    } else if (state.config.widget != null) {
        const base = state.config.widget.pricingStrategy.startsAt;
        return base;
    } else {
        return '?';
    }
};
export const selectInterval = state => state.config.widget != null && state.config.widget.pricingStrategy.config.billingOptions.includes('monthly') ? '/ mo' : '';
export const selectInputConfigs = state => state.config.widget != null ? state.config.widget.pricingStrategy.config.parameterConfig.filter(item => item.type === 'value'): [];
export const selectBillingOptions = state => state.config.widget != null ? state.config.widget.pricingStrategy.config.billingOptions : [];
export const selectIsLoading = state => state.config.isLoading;
export const selectForm = state => state.config.form;
export const selectQuote = state => state.config.quote;
export const selectChosenBillingOption = state => state.config.billingOption;
export const selectWidgetId = state => state.config.widget != null ? state.config.widget.widgetId : '';
export const selectFrequency = state => state.config.widget != null ? state.config.widget.details.frequency : '';
export const selectProposalTemplateId = state => state.config.widget != null ? state.config.widget.proposal.proposal_template_id : '';
export const selectIsActive = state => state.config.widget != null ? state.config.widget.active : true;
export const selectHexPrimary = state => state.config.widget != null ? '#' + state.config.widget.businessDetails.hex_primary : '#6A77D9';
export const selectHexSecondary = state => state.config.widget != null ? '#' + state.config.widget.businessDetails.hex_secondary : '#6A77D9';
export const { setFormValue, submitForm, setBillingOption } = configSlice.actions;
export default configSlice.reducer;
