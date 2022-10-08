import confetti from '../assets/confetti.png'
import LargeButton from "../components/buttons/button";
import googleIcon from '../assets/google-logo.png'
import SingleLineText from "../components/Inputs/SingleLineText";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TwoColumnForm from "../components/layout/TwoColumnForm/TwoColumnForm";
import DividingHeader from "../components/layout/DividingHeader/DividingHeader";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, signUpLocal, signInGoogle } from '../redux/authSlice';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if(isAuth) {
            navigate('/signup/2')
        }
    }, [dispatch])


    return (
        <div>
            <TwoColumnForm
                emoji={confetti}
                header="Signup"
                instructions="Let’s start by setting up a login for your account. You and coworkers can login into your widget dashboard to create and update pricing widgets."
            >
                <LargeButton size={5} isPrimary={false} className="mb-4" handleClick={() => dispatch(signInGoogle())}>
                    <img src={googleIcon} className="w-6 h-6 mr-2" />
                    <span>Sign Up with Google</span>
                </LargeButton>
                <DividingHeader text="Or Sign In With Google" />
                <SingleLineText
                    name="username"
                    label="Username"
                    type="text"
                    state={email}
                    setState={setEmail}
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
                <LargeButton handleClick={() => dispatch(signUpLocal({email, password}))} size={5} isPrimary={true}>Create Account</LargeButton>
                <br />
                <p><b>Already have an account?</b> <u><Link to="/login">Go to Login</Link></u></p>
            </TwoColumnForm>
        </div>
    )
}

export default Signup;