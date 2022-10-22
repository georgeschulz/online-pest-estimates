import SingleLineText from "../components/Inputs/SingleLineText";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import LargeButton from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBase, selectConfig, selectIsWidgetLoaded, updateBase, updateWidgetStrategy } from "../redux/widgetSlice";
import { useDispatch } from "react-redux";
import { getWidgetByIdReload } from "../redux/widgetSlice";
import PricingStrategy from "../components/PriceStrategy/PriceStrategy";
import ConfigForm from "../components/ConfigForm/configForm";
import { updateConfig } from "../redux/widgetSlice";
import Loading from "../components/loading/loading";
import { selectConfigParameters } from "../redux/widgetSlice";

function Pricing() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { widgetId } = useParams();

    const isWidgetLoaded = useSelector(selectIsWidgetLoaded);
    const config = useSelector(selectConfig)
    const parameters = useSelector(selectConfigParameters)
    const base = useSelector(selectBase)

    useEffect(() => {
        (async () => {
            try {
                if (!isWidgetLoaded) {
                    await dispatch(getWidgetByIdReload(widgetId))
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [config])

    const handleSubmit = async () => {
        try {
            await dispatch(updateWidgetStrategy({widgetId}))
            navigate(`/widget-proposal/${widgetId}/edit`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ApplicationMainLayout header="Pricing Parameters">
                <br />
                <div className="flex flex-wrap space-x-4">
                    {config == null ? <Loading /> :
                        <ConfigForm config={config} parameters={parameters} updateConfig={(results) => dispatch(updateConfig(results))}>
                            <SingleLineText
                                name="base"
                                label="Base Price"
                                type="number"
                                helper="$75"
                                state={base}
                                setState={(e) => dispatch(updateBase(e))}
                            />
                        </ConfigForm>
                    }

                    <div className="w-full">
                        <LargeButton handleClick={() => handleSubmit()} size={0} className="justify-center">Save</LargeButton>
                    </div>
                </div>

            </ApplicationMainLayout>

        </div>
    )
}

export default Pricing;