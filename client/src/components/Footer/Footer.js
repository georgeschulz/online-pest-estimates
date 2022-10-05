import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className='w-full bg-dark flex justify-center items-center text-center h-64 text-white'>
            <div className='flex justify-center flex-wrap max-w-4l color-white leading-loose'>
                <p className="text-2xl font-poppins font-semibold w-full">OnlinePestEstimates</p>
                <p className="text-1xl font-poppins w-full  space-x-2">
                    <Link to="/terms" className="hover:underline">Terms and Conditions </Link>
                    <span>|</span>
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                </p>
                <p className="text-1xl font-poppins font-semibold w-full">123 ABC Lane Alexandria, VA 22314</p>
            </div>
        </div>
    )
}

export default Footer;