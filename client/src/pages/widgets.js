import { useDispatch } from "react-redux"
import { deauthorize } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import Nav from "../components/layout/Nav/nav";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";

function Widgets() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <ApplicationMainLayout header="My Widgets">
            <p>Email: {user.email}</p>
            <br />
            <p className="bg-primary w-36 flex justify-center text-white rounded-full py-2 text-lg cursor-pointer" onClick={() => dispatch(deauthorize())}>Logout</p>
        </ApplicationMainLayout>
    )
}

export default Widgets