import { useState } from "react";
import TwoColumnForm from "../components/layout/TwoColumnForm/TwoColumnForm"
import clapping from '../assets/clap.png';
import LargeButton from "../components/buttons/button";
import googleIcon from '../assets/google-logo.png'
import DividingHeader from "../components/layout/DividingHeader/DividingHeader";
import SingleLineText from "../components/Inputs/SingleLineText";
import { Link } from "react-router-dom";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TwoColumnForm
            emoji={clapping}
            header="Login"
            instructions="Welcome back! Please login with either Google or your email. Please make sure to use the login type that you used before."
        >
            <LargeButton size={5} isPrimary={false} className="mb-4">
                <img src={googleIcon} className="w-6 h-6 mr-2" />
                <span>Sign In with Google</span>
            </LargeButton>
            <DividingHeader text="Or Sign in With Email" />
            <SingleLineText
                name="username"
                label="Username"
                type="text"
                state={userName}
                setState={setUserName}
                helper="georgeschulz33@gmail.com"
            />
            <SingleLineText
                name="password"
                label="Password"
                type="password"
                state={password}
                setState={setPassword}
                helper="********"
            />
            <br />
            <LargeButton size={5} isPrimary={true}>Login</LargeButton>
            <br />
            <p><b>Don't have an account yet?</b> <u><Link to="/signup/1">Get Started Here</Link></u></p>
        </TwoColumnForm>
    )
}

export default Login;