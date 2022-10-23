import { useDispatch } from "react-redux"
import { getLoggedInUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useEffect } from "react";
import { getUserWidgetList, selectIsWidgetListLoading, selectUserWidgets } from "../redux/widgetSlice";
import LargeButton from '../components/buttons/button';
import { createEmtpyWidget } from "../redux/widgetSlice";
import WidgetTable from "../components/WidgetTable/WidgetTable";
import { useNavigate } from "react-router-dom";

function Widgets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const widgets = useSelector(selectUserWidgets);
    const isLoading = useSelector(selectIsWidgetListLoading)

    useEffect(() => {
        (async () => {
            try {
                const response = await dispatch(getUserWidgetList())
                dispatch(getLoggedInUser())
            } catch (err) {
                console.log(err)
            }
        })();
    }, [dispatch])

    const handleClick = () => {
        (async () => {
            try {
                const response = await dispatch(createEmtpyWidget())
                navigate(`/strategies/${response.payload.data.widgetId}/edit`)
            } catch (err) {
                console.log('There was an issue creating a new widget')
            }
        })();
        
    }

    return (
        <ApplicationMainLayout header="My Widgets" currentPage="widgets" controls={<LargeButton handleClick={handleClick} size={0}>+ New Widget</LargeButton>}  isDataLoading={isLoading}>
            {widgets.length > 0 
                ? <WidgetTable />
                : (
                    <div className="flex justify-center flex-wrap text-center bg-lightgray px-4 py-5">
                        <p className="w-full text-lg font-roboto mb-3">It Looks Like You Haven't Made Any Widgets Yet.</p>
                        <LargeButton size={0} handleClick={handleClick}>Make a Widget</LargeButton>
                    </div>
                )
            }
        </ApplicationMainLayout>
    )
}

export default Widgets