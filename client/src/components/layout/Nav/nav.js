import logo from '../../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from './dropdownMenu';
import gear from '../../../assets/gear.png'
import gearOpen from '../../../assets/gear-open.png'
import { useDispatch } from 'react-redux';
import { deauthorize } from '../../../redux/authSlice';

function Nav({currentPage}) {
    const selected = 'border-b-4 border-primary '
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToBilling = () => {
        alert('Go to stripe billing!');
    }

    const openAccount = () => {
        navigate('/settings')
    }

    const logout = () => {
        dispatch(deauthorize())
    }

    return (
        <nav className='flex justify-between mb-5 px-8 py-2'>
            <div className='flex items-center'>
                <img src={logo} alt="PestEstimates Logo" className='w-8 h-8' />
                <p className='font-poppins font-bold'>OnlinePestEstimates</p>
            </div>
            <div className='flex items-center'>
                <Link to="/widgets"><span className={`text-lg font-bold mr-4 pb-2 ${currentPage === 'widgets' ? selected : ''}`}>My Widgets</span></Link>
                <Link to="/training"><span className={`text-lg font-bold mr-4 pb-2 ${currentPage === 'training' ? selected : ''}`}>Training</span></Link>
                <DropdownMenu closeIcon={gear} openIcon={gearOpen} menuItems={[
                    {label: 'Billing', handler: goToBilling},
                    {label: 'Account', handler: openAccount},
                    {label: 'Logout', handler: logout}
                ]} />
            </div>
        </nav>
    )
}

export default Nav;