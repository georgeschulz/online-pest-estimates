const { getProposal } = require('../model/getProposal');
const { agreeToProposal } = require('../model/agreeToProposal');

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

const agree = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await agreeToProposal(proposalId, ip);
        const proposal = await getProposal(proposalId);
        res.status(200).send({
            message: 'Proposal successfully agreed to',
            data: proposal
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({
            message: 'Could not agree to proposal',
            data: {}
        })
    }
}

module.exports = {
    readProposal,
    agree
}