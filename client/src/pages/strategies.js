import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import StrategyButton from "../components/StrategyButton/StrategyButton";

function Strategies() {
    return (
        <div>
            <ApplicationMainLayout header="Quote Calculator Recipes">
                <br />
                <div className="flex flex-wrap">
                    <StrategyButton strategy="Time Difficulty Strategy" name="Time x Difficulty Recipe" tag={<p className="text-green-600 mb-1">Recommended!</p>}>
                        <p>Our most accurate calculator that attempts to estimate time to complete the treatment, while taking into account the difficulty of the pest.</p>
                    </StrategyButton>
                    <StrategyButton strategy="Target Strategy" name="Target Recipe">
                        <p>A quick strategy that adds a fee based on each reported target based on the difficulty of the target.</p>
                    </StrategyButton>
                    <StrategyButton strategy="Interior Time Strategy" name="Based on Time to Complete Square Feet">
                        <p>Calculate the time to complete 100 square feet and use your desired hourly rate to provide an estimate.</p>
                    </StrategyButton>
                    <StrategyButton strategy="Exterior Time Strategy" name="Based on Time to Complete Acres">
                        <p>Calculate the time to complete the acreage and use your desired hourly rate to provide an estimate.</p>
                    </StrategyButton>
                    <StrategyButton strategy='Square Feet Strategy' name="Based on Square Feet">
                        <p>Directly specific how many dollars each square foot should be worth.</p>
                    </StrategyButton>
                </div>
            </ApplicationMainLayout>
        </div>
    )
}

export default Strategies;