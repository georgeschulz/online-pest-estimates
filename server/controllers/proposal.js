const { getProposal } = require('../model/getProposal');

const readProposal = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const proposal = await getProposal(proposalId);
        res.status(200).send({
            message: 'Proposal successfully retrieved',
            data: proposal
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({
            message: 'Could not find proposal',
            data: {}
        })
    }
}

module.exports = {
    readProposal
}