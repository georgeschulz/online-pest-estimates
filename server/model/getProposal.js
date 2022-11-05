const db = require('./db');

module.exports.getProposal = async (proposalId) => {
    try {
        const proposal = await db.query(`SELECT * FROM proposals WHERE proposal_id = $1`, [proposalId]);
        const features = await db.query(`SELECT * FROM proposal_features WHERE proposal_id = $1`, [proposalId]);
        return {
            ...proposal.rows[0],
            covered: features.rows.filter(feature => feature.is_included),
            not_covered: features.rows.filter(feature => !feature.is_included)
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}