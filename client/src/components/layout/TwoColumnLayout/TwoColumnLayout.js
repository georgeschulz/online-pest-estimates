import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deauthorize } from '../../../redux/authSlice';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../redux/authSlice';

function TwoColumnLayout({ background, children }) {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch();

    return (
        <div id="layout-container w-full h-full">
            {background}
            <div className="h-full w-1/2 bg-white absolute">
                <div className='flex justify-between w-full  px-4 pt-3'>
                    <Link to="/">
                        <div className="flex items-center">
                            <img src={logo} alt="PestEstimates Logo" className='w-8 h-8' />
                            <p className='font-poppins font-bold'>OnlinePestEstimates</p>
                        </div>
                    </Link>
                    <div className={isAuth ? 'underline pointer text-blue-600' : 'hidden'} onClick={() => dispatch(deauthorize())}>
                        Logout
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

export default TwoColumnLayout;