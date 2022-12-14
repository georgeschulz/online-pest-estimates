import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProposalThunk } from '../redux/proposalSlice';
import { useParams } from 'react-router-dom';
import { selectProgram, selectLegal, selectDescription, selectDidAgree, selectRecurringPrice, selectBillingFrequency, selectFrequency, selectSetup, selectCovered, selectNotCovered, selectTargetList, selectIsLoading, agreeToProposalThunk, getBrandingThunk, selectHexPrimary, selectHexSecondary, selectBusinessName } from '../redux/proposalSlice';
import Loading from '../components/loading/loading';
import LargeButton from '../components/buttons/button';
import Check from '../assets/check.png'
import X from '../assets/x.png'
import BillingTable from '../components/billingTable/billingTable';
import { useNavigate } from 'react-router-dom';

function Proposal() {
    const dispatch = useDispatch();
    const proposalId = useParams().proposalId;
    const program = useSelector(selectProgram);
    const legal = useSelector(selectLegal);
    const description = useSelector(selectDescription);
    const didAgree = useSelector(selectDidAgree);
    const recurringPrice = useSelector(selectRecurringPrice);
    const billingFrequency = useSelector(selectBillingFrequency);
    const frequency = useSelector(selectFrequency);
    const setup = useSelector(selectSetup);
    const covered = useSelector(selectCovered);
    const notCovered = useSelector(selectNotCovered);
    const targetList = useSelector(selectTargetList);
    const isLoading = useSelector(selectIsLoading);
    const hexPrimary = useSelector(selectHexPrimary);
    const hexSecondary = useSelector(selectHexSecondary);
    const businessName = useSelector(selectBusinessName);
    const navigate = useNavigate();

    useEffect(() => {
        // Get proposal data
        dispatch(getProposalThunk(proposalId));
        dispatch(getBrandingThunk(proposalId));
    }, [proposalId, hexPrimary]);

    const handleSubmit = () => {
        // Agree to proposal
        dispatch(agreeToProposalThunk(proposalId))
        navigate('/proposal-confirmed/' + proposalId)
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loading />
                </div>) : (
                <div>
                    {didAgree ? (
                        <div className='text-black text-center font-poppins py-5 bg-green-400'>
                            This proposal has been agreed to. If you have not yet recieved a call to schedule your appointment, please give us a call 123-123-1234.
                        </div>
                    ) : ""}

                    <div className=" text-white text-center font-poppins py-5" style={{'backgroundColor': hexPrimary}}>
                        <p className='text-xl'>{businessName}</p>
                        <p className='text-2xl font-semibold'>{program}</p>
                        <p className='text-xl'>Proposal</p>
                    </div>
                    <div className="flex justify-center mt-24">
                        <div className="w-2/3 md:w-full sm:w-full flex flex-wrap justify-center" style={{ 'minWidth': '380px', 'maxWidth': '1200px' }}>
                            {/**Summary Section */}
                            <div className="w-1/2 px-8" style={{ 'minWidth': '380px' }}>
                                <p className='font-semibold text-lg font-poppins mb-6'>Highlights</p>
                                <br />
                                <p className='text-md font-roboto'>{description}</p>
                                <br />
                                <p><span className='font-semibold text-lg font-poppins mb-8'>1st Service:</span> ${setup}</p>
                                <p><span className='font-semibold text-lg font-poppins mb-6'>Then:</span> ${recurringPrice} ({billingFrequency})</p>
                                <br />
                                <p><span className='font-semibold text-lg font-poppins mb-6'>Frequency:</span> {frequency}</p>
                                <br />
                                <br />
                                {didAgree ? "" : <a href="#agree"><LargeButton backgroundColor={hexSecondary} size={0}>Skip to Signature</LargeButton></a>}
                            </div>
                            {/** Charges Section*/}
                            <div className="flex justify-end w-1/2 px-8" style={{ 'minWidth': '380px' }} >
                                <div>
                                    <BillingTable
                                        setup={setup}
                                        recurringPrice={recurringPrice}
                                        billingFrequency={billingFrequency}
                                        frequency={frequency}
                                    />
                                </div>
                            </div>
                            {/** Benefits Section*/}
                            <div className="flex justify-center mt-24 mb-24 flex-wrap px-12">
                                <p className='font-semibold text-lg font-poppins mb-12 text-center w-full'>The Program</p>
                                <div className="flex flex-wrap justify-center" style={{ 'minWidth': '380px' }}>
                                    <div className="w-1/2 px-8" style={{ 'minWidth': '380px' }}>
                                        <p className='font-semibold text-lg font-poppins mb-6'>What's Covered</p>
                                        <div>
                                            {covered.map((feature, index) => {
                                                return (
                                                    <div key={index} className='flex items-center mb-6'>
                                                        <img src={Check} alt='check' className='w-6 h-6 mr-4' />
                                                        <p>{feature.text}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-8" style={{ 'minWidth': '380px' }}>
                                        <p className='font-semibold text-lg font-poppins mb-6'>What's Not Covered</p>
                                        <div>
                                            {notCovered.map((feature, index) => {
                                                return (
                                                    <div key={index} className='flex items-center mb-6'>
                                                        <img src={X} alt='x' className='w-6 h-6 mr-4' />
                                                        <p>{feature.text}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/** Target List Section*/}
                            <div className="flex justify-center mb-24 flex-wrap px-24">
                                <p className='font-semibold text-lg font-poppins mb-12 text-center w-full'>Covered Pests</p>
                                <div className="flex flex-wrap justify-center" style={{ 'minWidth': '380px' }}>
                                    <div className="w-full px-8" style={{ 'minWidth': '380px' }}>
                                        <div className='flex flex-wrap justify-center'>
                                            {targetList.map((target, index) => {
                                                return (
                                                    <div key={index} className='flex items-center mb-6 w-1/3' style={{ 'minWidth': '250px' }}>
                                                        <img src={Check} alt='check' className='w-6 h-6 mr-4' />
                                                        <p>{target}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/** Legal Section*/}
                            <div className='w-4/5 my-16'>
                                <p className='font-semibold text-lg font-poppins mb-6 text-center'>Legal</p>
                                <p style={{ 'whiteSpace': 'pre-line' }}>
                                    {legal}
                                </p>
                            </div>
                            {/** Signature Section*/}
                            <div id="agree" className='w-full mb-96 mt-12 flex justify-center'>
                                {didAgree ? (
                                    <div className='w-4/5 bg-green-400 flex justify-center align-middle py-4'>
                                        <p className='text-xl w-4/5 text-black text-center semibold'>This proposal has been agreed to. Our Office will contact you shortly to schedule your initial service and setup your billing.</p>
                                    </div>
                                ) : <LargeButton backgroundColor={hexSecondary} size={0} handleClick={handleSubmit}>I Agree</LargeButton>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Proposal;