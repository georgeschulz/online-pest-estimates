import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'

function PlainTextArticle({ header, children }) {
    return (
        <div className="flex flex-wrap justify-center">
            <nav className="w-full bg-pink h-16 flex items-center justify-between px-10">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt="PestEstimates Logo" className='w-8 h-8' />
                        <p className='font-poppins font-bold font-white'>OnlinePestEstimates</p>
                    </div>
                </Link>
                <div className='w-48 flex justify-between items-center'>
                    <Link to="/login" className='font-poppins'>Login</Link>
                    <Link to="/signup/1" className='bg-primary text-white px-6 py-1 shadow-sm rounded	shadow-slate-500 font-poppins'>Get Started</Link>
                </div>
            </nav>
            <div className="max-w-4xl text-2xl font-roboto leading-relaxed mb-16 mt-24">
                <p className="text-center text-3xl font-semibold font-poppins mb-16">{header}</p>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default PlainTextArticle;