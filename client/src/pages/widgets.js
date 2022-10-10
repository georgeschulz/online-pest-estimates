import { useDispatch } from "react-redux"
import { deauthorize, getLoggedInUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import Nav from "../components/layout/Nav/nav";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useEffect } from "react";
import { getUserWidgetList, selectUserWidgets } from "../redux/widgetSlice";
import LargeButton from '../components/buttons/button';

function Widgets() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const widgets = useSelector(selectUserWidgets);

    useEffect(() => {
        dispatch(getUserWidgetList())
    }, [])

    return (
        <ApplicationMainLayout header="My Widgets" currentPage="widgets" controls={<LargeButton size={0}>+ New Widget</LargeButton>}>
            {widgets.length > 0 
                ? 'WIDGET SCREEN'
                : (
                    <div className="flex justify-center flex-wrap text-center bg-lightgray px-4 py-5">
                        <p className="w-full text-lg font-roboto mb-3">It Looks Like You Haven't Made Any Widgets Yet.</p>
                        <LargeButton size={0}>Make a Widget</LargeButton>
                    </div>
                )
            }
        </ApplicationMainLayout>
    )
}

export default Widgets