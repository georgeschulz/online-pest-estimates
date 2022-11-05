const db = require('./db');

module.exports.agreeToProposal = async (proposalId, ip) => {
    try {
        const result = await db.query(
            `UPDATE proposals
            SET did_agree = true,
                user_ip = $1
            WHERE proposal_id = $2
            RETURNING *`,
            [ip, proposalId]
        );
        return result.rows[0].proposal_id;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
