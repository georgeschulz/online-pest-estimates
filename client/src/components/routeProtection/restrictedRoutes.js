import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSlice'

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);
    return <> {!isAuth ? <Outlet /> : <Navigate to="/widgets" /> } </>
}

export default RestrictedRoutes;