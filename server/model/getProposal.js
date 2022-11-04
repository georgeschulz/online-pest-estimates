const db = require('./db');

module.exports.getProposal = async (proposalId) => {
    try {
        const proposal = await db.query(`SELECT * FROM proposals WHERE proposal_id = $1`, [proposalId]);
        return proposal.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}