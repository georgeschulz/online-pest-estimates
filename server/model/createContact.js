const db = require('./db');

module.exports.createContact = async (widgetId, name, email, phone) => {
    try {
        //create a respones record in the responses table
        const response = await db.query(`INSERT INTO responses (widget_id, signed_up) VALUES ($1, $2) RETURNING response_id`, [widgetId, false]);

        const contact = await db.query(
            `INSERT INTO responses_contacts (response_id, name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *`,
            [response.rows[0].response_id, name, email, phone]
        );
        return contact.rows[0];
    } catch (err) {
        throw err;
    }
}
