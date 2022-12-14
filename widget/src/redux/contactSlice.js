import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpoint } from './config';

export const createContact = createAsyncThunk(
    'contact/createContact',
    async (contact) => {
        try {
            const response = await axios.post(`${endpoint}/public-widget/${contact.widgetId}/contact`, contact);
            return response.data.data;
        } catch (err) {
            console.log(err)
        }
    }
)

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        name: '',
        email: '',
        phone: '',
        isLoading: false,
        contactRecord: null
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createContact.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.contactRecord = action.payload;
        })
    }
})

export const selectName = state => state.contact.name;
export const selectEmail = state => state.contact.email;
export const selectPhone = state => state.contact.phone;
export const selectResponseId = state => state.contact.contactRecord != null ? state.contact.contactRecord.response_id : '';
export const { setName, setEmail, setPhone } = contactSlice.actions;
export default contactSlice.reducer;