const db = require('./db');
const format = require('pg-format');

module.exports.addProposalFeatures = async (proposal_id, features) => {
    try {
        const addFeaturesQuery = await db.query(format(`INSERT INTO proposal_features (proposal_id, text, is_included) VALUES  %L RETURNING *`,
        [...features.map(feature => [proposal_id, feature.text, feature.is_included])]));
        return addFeaturesQuery.rows;
    } catch(err) {
        console.log(err);
        throw new err;
    }
}