import SingleSelect from "../components/Inputs/SingleSelect";
import CheckBoxGroup from "../components/Inputs/CheckBoxGroup";
import SingleLineText from "../components/Inputs/SingleLineText";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import LargeButton from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";

function Pricing() {
    const navigate = useNavigate();
    const { widgetId } = useParams();

    return (
        <div>
            <ApplicationMainLayout header="Pricing Parameters">
                <br />
                <div className="flex flex-wrap space-x-4">
                    <div className="w-1/2">
                        <SingleLineText 
                            name="base"
                            label="Base Price"
                            type="number"
                            helper="$75"
                        />
                    </div>
                    <div className="w-1/2">

                    </div>
                    <LargeButton handleClick={() => navigate(`/widget-proposal/${widgetId}/edit`)}>Save</LargeButton>
                </div>
                
            </ApplicationMainLayout>
            
        </div>
    )
}

export default Pricing;