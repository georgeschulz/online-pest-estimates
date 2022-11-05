import { selectProgram } from "../redux/proposalSlice"
import { useSelector } from "react-redux"

function ProposalConfirmed() {
    const program = useSelector(selectProgram)

    return (
        <div>
            <div className="bg-primary text-white text-center font-poppins py-5">
                <p className='text-xl'>ABC Pest</p>
                <p className='text-2xl font-semibold'>{program}</p>
                <p className='text-xl'>Proposal</p>
            </div>
            <div className="flex justify-center mt-24">
                <div className="w-1/2 flex flex-wrap justify-center font-roboto text-left" style={{ 'minWidth': '380px', 'maxWidth': '1200px' }}>
                    <p className="text-lg">Thank you for confirming your proposal. Our office will reach out to you shortly to setup your initial service and to setup your program's billing. <br /><br />For faster serivce or for questions, please call 123-123-1234.</p>
                </div>
            </div>
        </div>
    )
}

export default ProposalConfirmed;