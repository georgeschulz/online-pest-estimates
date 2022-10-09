import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import DropdownMenu from './dropdownMenu';
import gear from '../../../assets/gear.png'
import gearOpen from '../../../assets/gear-open.png'

function Nav() {
    return (
        <nav className='flex justify-between mb-5 px-8 py-2'>
            <div className='flex items-center'>
                <img src={logo} alt="PestEstimates Logo" className='w-8 h-8' />
                <p className='font-poppins font-bold'>OnlinePestEstimates</p>
            </div>
            <div className='flex items-center'>
                <Link to="/widgets"><span className="text-lg font-bold mr-4">My Widgets</span></Link>
                <Link to="/training"><span className="text-lg font-bold mr-4">Training</span></Link>
                <DropdownMenu closeIcon={gear} openIcon={gearOpen} menuItems={[
                    {label: 'Billing', location: '/billing'},
                    {label: 'Account', location: '/settings'},
                    {label: 'Logout', location: '/logout'}
                ]} />
            </div>
        </nav>
    )
}

export default Nav;