import SingleSelect from "../components/Inputs/SingleSelect";
import CheckBoxGroup from "../components/Inputs/CheckBoxGroup";
import SingleLineText from "../components/Inputs/SingleLineText";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import LargeButton from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsWidgetLoaded } from "../redux/widgetSlice";
import { useDispatch } from "react-redux";
import { getWidgetByIdReload } from "../redux/widgetSlice";

function Pricing() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { widgetId } = useParams();

    const isWidgetLoaded = useSelector(selectIsWidgetLoaded);

    useEffect(() => {
        (async () => {
            try {
                if(!isWidgetLoaded) {
                    await dispatch(getWidgetByIdReload(widgetId))
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

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