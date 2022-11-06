const { getProposal } = require('../model/getProposal');
const { agreeToProposal } = require('../model/agreeToProposal');
const postmark = require('postmark');
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const { getBranding } = require('../model/getBranding');

const readProposal = async (req, res) => {
    try {
        const { proposalId } = req.params;
        console.log(proposalId)
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

        if(process.env.FEATURE_PROPOSAL_SIGNED_EMAIL === 'on') {
            client.sendEmailWithTemplate({
                "From": "service@bettertermite.com",
                "To": "service@bettertermite.com",
                "TemplateAlias": "user-invitation-2",
                "TemplateModel": {
                  "product_url": "https://onlinepestestimates.herokuapp.com/",
                  "product_name": "Online Pest Estimates",
                  "email": proposal.email,
                  "phone": proposal.phone,
                  "action_url": `${process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com' : 'http://localhost:3000'}/proposal-view/${proposalId}`,
                  "company_name": "Online Pest Estimates",
                  "company_address": "123 ABC Street",
                  "name": proposal.name,
                  "invite_sender_name": "Online Pest Estimates",
                  "invite_sender_organization_name": "Online Pest Estimates",
                  "support_email": "https://onlinepestestimates.herokuapp.com/",
                  "live_chat_url": "https://onlinepestestimates.herokuapp.com/",
                  "help_url": "https://onlinepestestimates.herokuapp.com/"
                }
              });
        }
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

const getBrandingController = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const branding = await getBranding(proposalId);
        res.status(200).send({
            message: 'Branding successfully retrieved',
            data: branding
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({
            message: 'Could not find branding',
            data: {}
        })
    }
}

module.exports = {
    readProposal,
    agree,
    getBrandingController
}