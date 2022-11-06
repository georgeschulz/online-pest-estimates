const db = require ('./db');

module.exports.getBranding = async (proposalId) => {
    try {
        const { rows: branding } = await db.query(`
            SELECT 
                businesses.name,
                businesses.hex_primary,
                businesses.hex_secondary
            FROM proposals
            INNER JOIN responses
            ON responses.response_id = proposals.response_id
            INNER JOIN widgets
                ON widgets.widget_id = responses.widget_id
            INNER JOIN users
                ON widgets.user_id = users.user_id
            INNER JOIN businesses
                ON users.user_id = businesses.user_id
            WHERE proposal_id = $1;
        `, [proposalId]);

        return branding[0];
    } catch (err) {
        console.log(err);
        throw new err;
    }
}