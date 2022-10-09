import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAccountSetup, selectIsAuth } from '../../redux/authSlice'

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);
    const isSetup = useSelector(selectIsAccountSetup);
    return <> {!isAuth ? <Outlet /> : <Navigate to={isSetup ? "/widgets" : '/signup/2'} /> } </>
}

export default RestrictedRoutes;