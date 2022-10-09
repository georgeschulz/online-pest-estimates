import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onLogin, onLogout, onSignup, onGoogleSignIn } from "../api/authApi";
import { createBusiness, getUser, updateBusiness } from "../api/userApi";

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

export const updateBusinessDetails = createAsyncThunk(
    'user/updateBusiness',
    async(businessData, thunkAPI) => {
        const response = await updateBusiness(businessData)
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
        passwordField: '',
        isSetup: false,
        businessInfo: {},
        getUserDetailsIsPending: false
    },
    reducers: {
        setName: (state, action) => {
            state.user.name = action.payload;
        },
        setPhone: (state, action) => {
            state.user.phone  = action.payload;
        },
        setHexPrimary: (state, action) => {
            state.user.hex_primary = action.payload.hex.slice(1, 7);
        },
        setHexSecondary: (state, action) => {
            state.user.hex_secondary = action.payload.hex.slice(1, 7)
        },
        setEmail: (state, action) => {
            state.user.email = action.payload;
        }, 
        setPasswordField: (state, action) => {
            state.passwordField = action.payload;
        }

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

        builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
            state.getUserDetailsIsPending = false;
            state.user = action.payload.data;
        });

        builder.addCase(getLoggedInUser.pending, (state, action) => {
            state.getUserDetailsIsPending = true;
        })
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginIsPending = state => state.auth.loginIsPending;
export const selectIsAccountSetup = state => state.auth.isSetup;
export const selectBusinessName = state => state.auth.user.name;
export const selectPhone = state => state.auth.user.phone;
export const selectHexPrimary = state => state.auth.user.hex_primary;
export const selectHexSecondary = state => state.auth.user.hex_secondary;
export const selectHasBusinessDetails = state => state.auth.isSetup;
export const selectIsGetUserDetailsPending = state => state.auth.getUserDetailsIsPending;
export const selectUser = state => state.auth.user;
export const selectPasswordField = state => state.auth.passwordField;
export const selectEmail = state => state.auth.user.email;
export const { setName, setHexPrimary, setHexSecondary, setPhone, setPasswordField, setEmail } = authSlice.actions;
export default authSlice.reducer;