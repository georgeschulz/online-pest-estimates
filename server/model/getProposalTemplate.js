const db = require('./db');

module.exports.getProposalTemplate = async (widgetId) => {
    try {
        const proposalTemplateQuery = await db.query(
           `SELECT * 
            FROM proposal_templates 
            INNER JOIN highlighted_features
              ON proposal_templates.proposal_template_id = highlighted_features.proposal_template_id
            WHERE widget_id = $1;`, [widgetId]
        );
        //make sure if something breaks down and there are two proposals to only get the first one
        const firstProposalId = proposalTemplateQuery.rows[0].proposal_template_id;
        const proposalTemplate = proposalTemplateQuery.rows.filter(proposal => proposal.proposal_template_id === firstProposalId);

        return proposalTemplate;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}