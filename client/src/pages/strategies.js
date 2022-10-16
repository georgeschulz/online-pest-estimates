import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import StrategyButton from "../components/StrategyButton/StrategyButton";

function Strategies() {
    return (
        <div>
            <ApplicationMainLayout header="Quote Calculator Recipes">
                <br />
                <div className="flex flex-wrap">
                    <StrategyButton name="Time x Difficulty Recipe" tag={<p className="text-green-600 mb-1">Recommended!</p>}>
                        <p>Our most accurate calculator that attempts to estimate time to complete the treatment, while taking into account the difficulty of the pest.</p>
                    </StrategyButton>
                </div>
            </ApplicationMainLayout>
        </div>
    )
}

export default Strategies;