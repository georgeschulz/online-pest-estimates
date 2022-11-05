import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProposalThunk } from '../redux/proposalSlice';
import { useParams } from 'react-router-dom';
import { selectProgram, selectLegal, selectDescription, selectDidAgree, selectRecurringPrice, selectBillingFrequency, selectFrequency, selectSetup, selectCovered, selectNotCovered, selectTargetList, selectIsLoading } from '../redux/proposalSlice';
import Loading from '../components/loading/loading';
import LargeButton from '../components/buttons/button';
import Check from '../assets/check.png'
import X from '../assets/x.png'
import BillingTable from '../components/billingTable/billingTable';

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

    useEffect(() => {
        // Get proposal data
        dispatch(getProposalThunk(proposalId));
    }, [proposalId]);

    return (
        <div>
            {isLoading ? (
                <div>
                    <div className="bg-primary text-white text-center font-poppins py-5 mb-24">
                        <p className='text-xl'>Proposal</p>
                    </div>
                    <Loading />
                </div>) : (
                <div>
                    <div className="bg-primary text-white text-center font-poppins py-5">
                        <p className='text-xl'>ABC Pest</p>
                        <p className='text-2xl font-semibold'>{program}</p>
                        <p className='text-xl'>Proposal</p>
                    </div>
                    <div className="flex justify-center mt-24">
                        <div className="w-2/3 flex flex-wrap justify-center" style={{ 'minWidth': '380px', 'maxWidth': '1200px' }}>
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
                                <a href="#agree"><LargeButton size={0}>Skip to Signature</LargeButton></a>
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
                            <div className="flex justify-center mt-24 mb-24 flex-wrap px-24">
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
                                <LargeButton size={0}>I Agree</LargeButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Proposal;