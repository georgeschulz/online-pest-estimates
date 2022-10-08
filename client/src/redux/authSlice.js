import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onLogin } from "../api/login";

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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage(),
        loginError: null,
        loginIsPending: false
    },
    reducers: {
        deauthorize: (state) => {
            localStorage.removeItem('isAuth');
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        //handle login api states
        builder.addCase(authorize.fulfilled, (state, action) => {
            state.loginIsPending = false;
            state.loginError = null;
            state.isAuth = true
            localStorage.setItem('isAuth', true)
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
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginIsPending = state => state.auth.loginIsPending;
export const { deauthorize } = authSlice.actions;
export default authSlice.reducer;