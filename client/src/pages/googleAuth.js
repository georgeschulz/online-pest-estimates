import Loading from "../components/loading/loading";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoggedIn } from '../redux/authSlice'

function GoogleAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                await dispatch(checkLoggedIn())
            } catch (e) {
                console.log(e)
            }
            
        })();
    }, [])

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <Loading />
        </div>
    )
}

export default GoogleAuth;