import Loading from "../components/loading/loading";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoggedIn } from '../redux/authSlice'
import { useNavigate, useSearchParams } from "react-router-dom";

function GoogleAuth() {
    const dispatch = useDispatch();
    const naviate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            try {
                const goto = searchParams.get('goto');
                await dispatch(checkLoggedIn())
                naviate('/' + goto);
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