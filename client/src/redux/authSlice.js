import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onLogin, onLogout, onSignup } from "../api/authApi";
import { getUser } from "../api/userApi";

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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage(),
        loginError: null,
        loginIsPending: false,
        user: {},
        isSetup: false
    },
    extraReducers: (builder) => {
        //handle login api states
        builder.addCase(authorize.fulfilled, (state, action) => {
            state.loginIsPending = false;
            state.loginError = null;
            state.isAuth = true
            localStorage.setItem('isAuth', true)
            state.user = action.payload.data;
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
            localStorage.removeItem('isAuth');
        })

        //signup API
        builder.addCase(signUpLocal.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload.data;
        })
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginIsPending = state => state.auth.loginIsPending;
export const selectUser = state => state.auth.user;
export default authSlice.reducer;