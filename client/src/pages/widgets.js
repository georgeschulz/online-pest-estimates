import { useDispatch } from "react-redux"
import { getLoggedInUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useEffect } from "react";
import { getUserWidgetList, selectUserWidgets } from "../redux/widgetSlice";
import LargeButton from '../components/buttons/button';
import { createEmtpyWidget } from "../redux/widgetSlice";
import WidgetTable from "../components/WidgetTable/WidgetTable";
import { getUser } from "../api/userApi";

function Widgets() {
    const dispatch = useDispatch();
    const widgets = useSelector(selectUserWidgets);

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
            await dispatch(createEmtpyWidget())
            await dispatch(getUserWidgetList())
        })();
        
    }

    return (
        <ApplicationMainLayout header="My Widgets" currentPage="widgets" controls={<LargeButton handleClick={handleClick} size={0}>+ New Widget</LargeButton>}>
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