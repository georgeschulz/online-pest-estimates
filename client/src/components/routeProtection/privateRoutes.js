import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSlice'

function PrivateRoutes() {
    const isAuth = useSelector(selectIsAuth);
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" /> }</>
}

export default PrivateRoutes;