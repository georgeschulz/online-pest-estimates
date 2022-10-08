import { useDispatch } from "react-redux"
import { deauthorize } from "../redux/authSlice";

function Widgets() {
    const dispatch = useDispatch();

    return (
        <div>
            <p>WIDGETS SCREEN</p>
            <p onClick={() => dispatch(deauthorize())}>Logout</p>
        </div>
    )
}

export default Widgets