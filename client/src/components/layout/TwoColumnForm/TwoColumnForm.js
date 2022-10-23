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
                    <div id="signup-local-form" className=" xl:w-4/5 2xl:w-3/5 md:w-full lg:w-full py-10 sm:w-full">
                        {children}
                    </div>
                </div>
            </div>
        </TwoColumnLayout>
    )
}

export default TwoColumnForm;