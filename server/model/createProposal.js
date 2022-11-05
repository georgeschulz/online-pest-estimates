const db = require('./db');
const { v4: uuidv4 } = require('uuid');

module.exports.createProposal = async (responseId, proposalTemplateId, setup, recurringPrice, description, legal, billingFrequency, frequency, program, targetList) => {
    try {
        const proposalId = uuidv4();

        const proposalQuery = await db.query(`INSERT INTO proposals (proposal_id, did_agree, response_id, proposal_template_id, setup, recurring_price, description, legal, billing_frequency, frequency, program_name, target_list)
        VALUES ($1, false, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`, 
        [proposalId, responseId, proposalTemplateId, setup, recurringPrice, description, legal, billingFrequency, frequency, program, targetList]);

        return proposalQuery.rows[0];
    } catch (e) {
        console.log(e)
        throw e;
    }
}