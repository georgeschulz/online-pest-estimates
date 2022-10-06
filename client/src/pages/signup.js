import confetti from '../assets/confetti.png'
import LargeButton from "../components/buttons/button";
import googleIcon from '../assets/google-logo.png'
import SingleLineText from "../components/Inputs/SingleLineText";
import { useState } from "react";
import { Link } from "react-router-dom";
import TwoColumnForm from "../components/layout/TwoColumnForm/TwoColumnForm";
import DividingHeader from "../components/layout/DividingHeader/DividingHeader";

function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <TwoColumnForm
                emoji={confetti}
                header="Signup"
                instructions="Let’s start by setting up a login for your account. You and coworkers can login into your widget dashboard to create and update pricing widgets."
            >
                <LargeButton size={5} isPrimary={false} className="mb-4">
                    <img src={googleIcon} className="w-6 h-6 mr-2" />
                    <span>Sign Up with Google</span>
                </LargeButton>
                <DividingHeader text="Or Sign In With Google" />
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
                <LargeButton size={5} isPrimary={true}>Create Account</LargeButton>
                <br />
                <p><b>Already have an account?</b> <u><Link to="/login">Go to Login</Link></u></p>
            </TwoColumnForm>
        </div>
    )
}

export default Signup;