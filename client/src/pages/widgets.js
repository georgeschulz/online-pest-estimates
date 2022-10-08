import { useDispatch } from "react-redux"
import { deauthorize } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

function Widgets() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    return (
        <div className="p-10">
            <b className="text-xl">WIDGETS SCREEN</b>
            <p>Email: {user.email}</p>
            <br />
            <p className="bg-primary w-36 flex justify-center text-white rounded-full py-2 text-lg cursor-pointer" onClick={() => dispatch(deauthorize())}>Logout</p>
        </div>
    )
}

export default Widgets