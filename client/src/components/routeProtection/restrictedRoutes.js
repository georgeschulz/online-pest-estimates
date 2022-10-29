import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAccountSetup, selectIsAuth, selectHasPaid } from '../../redux/authSlice'

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);
    const isSetup = useSelector(selectIsAccountSetup);
    const hasPaid = useSelector(selectHasPaid);
    return <> {!isAuth ? <Outlet /> : <Navigate to={isSetup && hasPaid ? "/widgets" : '/signup/2'} /> } </>
}

export default RestrictedRoutes;