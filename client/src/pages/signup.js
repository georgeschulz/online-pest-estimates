import TwoColumnLayout from "../components/TwoColumnLayout/TwoColumnLayout";
import GradientBackground from "../components/GradientBackground/GradientBackground";
import confetti from '../assets/confetti.png'
import LargeButton from "../components/LargeButton/LargeButton";
import googleIcon from '../assets/google-logo.png'

function Signup() {
    return (
        <div>
            <TwoColumnLayout background={<GradientBackground />}>
                <div id="content-container" className="pt-32 pl-16 text-matte">
                    <img src={confetti} className="mb-8 w-24" />
                    <p className="font-poppins text-6xl font-bold mb-6">Signup</p>
                    <p className="text-2xl font-roboto text-lightmatte">Let’s start by setting up a login for your account. You and coworkers can login into your widget dashboard to create and update pricing widgets.</p>

                    <div id="signup-local-form" className="w-3/5">
                        <LargeButton size={5} isPrimary={false} className="mb-4">
                            <img src={googleIcon} className="w-6 h-6 mr-2"/>
                            <span>Sign In with Google</span>
                        </LargeButton>
                        <LargeButton size={5} isPrimary={true}>Login</LargeButton>
                    </div>
                </div>
            </TwoColumnLayout>
        </div>  
    )
}

export default Signup;