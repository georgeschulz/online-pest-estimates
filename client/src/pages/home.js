import logo from '../assets/logo.png';
import heroSmall from '../assets/hero-small-screen.jpg';
import hero from '../assets/hero.jpg';
import BenefitBox from '../components/BenefitBox/BenefitBox';
import Footer from '../components/Footer/Footer';
import cheetahPic from '../assets/cheetah.jpg'
import check from '../assets/check.png'

//images for benefits
import funnel from '../assets/funnel.png';
import money from '../assets/money.png';
import hourglass from '../assets/hourglass.png';

import widgetTile from '../assets/widget-tile-ex.png'
import widgetParameters from '../assets/widget-tile-parameters.png';

import { Link } from 'react-router-dom';

function HomePage() {
    const benefits = ["Unlimited Services", "Unlimitted Widgets", "Unlimitted Quotes", "Training on Implementing Pricing Calculators", "SOPs for Handling Online Quotes in real life"];

    return (
        <div>
            <div id="hero" className='mb-10'>
                <div className='hero-img absolute'>
                    <img src={hero} className="hero-img-large" />
                    <img src={heroSmall} className="hero-img-small" />
                </div>
                <header>
                    <nav className="flex justify-between  px-4 py-3 absolute w-full">
                        <div className="flex items-center">
                            <img src={logo} alt="PestEstimates Logo" className='w-8 h-8' />
                            <p className='font-poppins font-bold'>OnlinePestEstimates</p>
                        </div>
                        <div className='w-48 flex justify-between items-center'>
                            <Link to="/login" className='font-poppins'>Login</Link>
                            <Link to="/signup/1" className='bg-primary text-white px-6 py-1 shadow-sm rounded	shadow-slate-500 font-poppins'>Get Started</Link>
                        </div>
                    </nav>
                </header>
                <div className="absolute inset-y-48 right-0 w-1/2 px-10 font-poppins">
                    <h1 className='text-8xl font-bold mb-5'>Survival of the Fastest</h1>
                    <h2 className='text-4xl font-bold leading-relaxed'>Easily Provide Custom Pest Control Quotes Online To Win More Sales</h2>
                </div>

                <div className="hero-features-row">
                    <BenefitBox
                        headline="Convert More Leads"
                        benefit="Every minute leads wait for your call or an estimate, competitors are pushing for the sale. Your buyers are ready to buy. Let them buy quickly."
                        icon={funnel}
                    />
                    <BenefitBox
                        headline="Replace Sales Teams"
                        benefit="Using salespeople for online buying is expensive. Slash commission and save on massive sales team overhead.  Make your cost per sale actually work."
                        icon={money}
                    />
                    <BenefitBox
                        headline="Modernize Your Sales"
                        benefit="Your customers are buying everything from clothes to groceries online. Take advantage of the trend by making it easy to setup service plans online."
                        icon={hourglass}
                    />
                </div>
            </div>

            <main>
                <div id="main-container" className='flex justify-center flex-wrap w-full'>
                    <div id="content-container" className="max-w-screen-xl">
                        <section className='flex justify-center flex-wrap'>
                            <h2 className='text-4xl text-center font-semibold mt-24 w-full'>The Problem</h2>
                            <div className="flex px-8 py-12 items-center">
                                <div className='px-10 w-1/2'>
                                    <h3 className='text-2xl font-semibold mb-6'>Your Sales Model is Inefficient</h3>
                                    <p className='mb-4'>Let’s face it. Pest Control Pay-Per-Click advertising isn’t what it used to be. Lead costs are soaring. If you want to spend your whole budget, you’ll be forking over $200 to be one of five companies talking to a lead. What are you doing to beat them head-to-head?</p>
                                    <h3 className='text-2xl font-semibold mb-6'>To win leads, you have to be fast</h3>
                                    <p>Research shows that responding to leads within 5 minutes is 21x more effective than calling after 30 minutes. Have leads sat unresponded to in your inbox for more than 5 minutes?</p>
                                    <p>The truth is that your customers aren’t waiting for you, they’re shopping for a solution. To win in this cut-throat envirornment, you need to be the first to help a customer get a solution to their problem.</p>
                                </div>
                                <div className='flex justify-center w-1/2'>
                                    <img src={cheetahPic} style={{ 'width': '350px' }} className="w-200px" />
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className='text-4xl text-center font-semibold mt-24'>What To Do</h2>
                            <div className="flex px-8 py-12 items-center">
                                <div className='flex justify-center w-1/2'>
                                    <img src={widgetTile} style={{ 'width': '350px' }} className="w-200px" />
                                </div>
                                <div className='px-10 w-1/2'>
                                    <h3 className='text-2xl font-semibold mb-6'>Customers Want to Shop Around. Let them buy.</h3>
                                    <p className='mb-4'>Your leads are contacting your competitors while they wait for your call and then in-person estimate. At today’s speeds, your customers are looking for fast solutions and pricing online. This isn’t easy because every house is unique. You probably aren’t sure how to do this in a practical way without providing flat pricing, which doesn’t work.</p>
                                    <h3 className='text-2xl font-semibold mb-6'>But providing online quotes provides big rewards:</h3>
                                    <ul className='list-disc pl-5 space-y-1'>
                                        <li>Win more leads by letting customers make a decision immediately, rather than wait for an estimate or call</li>
                                        <li>Free up resources from big sales teams and manager overhead</li>
                                        <li>Drive the profitability of your advertising by cutting down on your massive monthly commission bills</li>
                                        <li>Save on every lead and make your pay-per-click advertising make sense again</li>
                                        <li>Let your revenue-producing techs focus on getting work done, rather than order-taking for tire-kicking leads</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className='text-4xl text-center font-semibold mt-24'>How We'll Do It</h2>
                            <div className="flex px-8 py-12 items-center">
                                <div className='px-10 w-1/2'>
                                    <h3 className='text-2xl font-semibold mb-6'>Create a custom widget for your site</h3>
                                    <p className='mb-4'>Make a widget for each of your services. We’ll provide you with template pricing structures that you adjust until the prices make sense to you. We’ll provide you a snippet of text that you or your marketing company can copy and paste onto your website.</p>
                                    <p className='mb-4'>Our software will immediately email you leads as customers fill out quote requests online, whether they finish the form or not. </p>
                                    <h3 className='text-2xl font-semibold mb-6'>What’s next?</h3>
                                    <p>That’s it. You’re ready to close more sales, cheaper.</p>
                                </div>
                                <div className='flex justify-center w-1/2'>
                                    <img src={widgetParameters} style={{ 'width': '350px' }} className="w-200px" />
                                </div>
                            </div>
                        </section>

                        <section className='mb-2'>
                            <h2 className='text-4xl text-center font-semibold mt-24'>Our Pricing</h2>
                            <div className='w-full flex justify-center mb-8'>
                                <p className='text-2xl text-center w-2/2'>Our goal is simplicity. We offer only one plan with unlimitted usage and training on how to apply it in the real world.</p>
                            </div>
                            <div className='flex justify-center'>
                                <div className='shadow shadow-slate-800 px-10 py-10 w-96 border-black-300'>
                                    <p className="font-bold text-3xl text-center">Total Access</p>
                                    <p className='text-xl text-center mb-4'>99.99 / Month</p>
                                    {benefits.map(benefit => {
                                        return (
                                            <div className='flex mb-3'>
                                                <img src={check} className="w-8 h-8" />
                                                <p className='my-1 text-lg'>{benefit}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className='w-full bg-pink flex justify-center items-center text-center h-64 mt-16'>
                    <div className='flex justify-center flex-wrap max-w-4l'>
                        <h2 className='text-3xl font-semibold w-full font-poppins'>Ready to Build a Sales Process That Makes Sense for 2022?</h2>
                        <Link to="/signup/1">
                            <div className='bg-primary text-white px-5 py-2 shadow-sm rounded	shadow-slate-500 text-lg font-poppins w-96 mt-6'>
                                Get Started
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default HomePage;