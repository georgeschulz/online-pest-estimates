import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { onLogin, onLogout, onSignup, onGoogleSignIn } from "../api/authApi";
import { createBusiness, getUser } from "../api/userApi";

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth');
    return isAuth && JSON.parse(isAuth);
}

export const authorize = createAsyncThunk(
    'auth/loginAttempt',
    async(loginData, thunkAPI) => {
        const { email, password } = loginData;
        const response = await onLogin(email, password);
        return response.data;
    }
)

export const deauthorize = createAsyncThunk(
    'auth/logout',
    async(thunkAPI) => {
        const response = await onLogout();
        return response.data;
    }
)

export const getLoggedInUser = createAsyncThunk(
    'user/getLoggedInUser',
    async (thunkAPI) => {
        const response = await getUser();
        return response.data;
    }
)

export const signUpLocal = createAsyncThunk(
    'user/signup',
    async(signupData, thunkAPI) => {
        const { email, password } = signupData;
        const response = await onSignup(email, password);
        return response.data;
    }
)

export const signInGoogle = createAsyncThunk(
    'user/signin-google',
    async(thunkAPI) => {
        const response = await onGoogleSignIn();
        return response.data;
    }
)

export const addBusinessInfo = createAsyncThunk(
    'user/createBusiness',
    async(businessData, thunkAPI) => {
        const response = await createBusiness(businessData);
        return response.data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage(),
        loginError: null,
        loginIsPending: false,
        user: {},
        isSetup: false,
        businessInfo: {}
    },
    extraReducers: (builder) => {
        //handle login api states
        builder.addCase(authorize.fulfilled, (state, action) => {
            state.loginIsPending = false;
            state.loginError = null;
            state.isAuth = true
            localStorage.setItem('isAuth', true)
            state.user = action.payload.data;

            if(action.payload.data.is_setup) {
                state.isSetup = true;
            }
        });

        builder.addCase(authorize.rejected, (state, action) => {
            state.loginIsPending = false;
            if(action.error.message.includes(401)) {
                state.loginError = 'Incorrect username or password';
            } else {
                state.loginError = 'Something went wrong. Please try logging in again.'
            }           
        })

        builder.addCase(authorize.pending, (state, action) => {
            state.loginIsPending = true;
        })

        //logout API
        builder.addCase(deauthorize.fulfilled, (state, action) => {
            state.isAuth = false;
            state.loginError = null;
            state.user = {}
            state.isSetup = false;
            state.businessInfo = {};
            localStorage.removeItem('isAuth');
        })

        //signup API
        builder.addCase(signUpLocal.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload.data;

            if(action.payload.data.is_setup) {
                state.isSetup = true;
            }
        })

        builder.addCase(addBusinessInfo.fulfilled, (state, action) => {
            state.businessInfo = action.payload.data;
            state.isSetup = true;
        })
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginIsPending = state => state.auth.loginIsPending;
export const selectIsAccountSetup = state => state.auth.isSetup;
export const selectHasBusinessDetails = state => state.auth.isSetup;
export const selectUser = state => state.auth.user;
export default authSlice.reducer;