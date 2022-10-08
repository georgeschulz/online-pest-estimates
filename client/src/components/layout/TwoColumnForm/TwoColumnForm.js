import TwoColumnLayout from "../TwoColumnLayout/TwoColumnLayout";
import GradientBackground from "../GradientBackground/GradientBackground";

function TwoColumnForm({ emoji, header, instructions, children }) {
    return (
        <TwoColumnLayout background={<GradientBackground />}>
            <div id="content-container" className="flex justify-center w-full h-full px-24 items-center text-matte">
                <div>
                    <img src={emoji} className="mb-8 w-24" />
                    <p className="font-poppins text-6xl font-bold mb-6">{header}</p>
                    <p className="text-2xl font-roboto text-lightmatte">{instructions}</p>
                    <div id="signup-local-form" className="w-3/5 py-10">
                        {children}
                    </div>
                </div>
            </div>
        </TwoColumnLayout>
    )
}

export default TwoColumnForm;