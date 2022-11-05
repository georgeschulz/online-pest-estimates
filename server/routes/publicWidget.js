const router = require('express').Router();
const controllers = require('../controllers/widget');
const getWidget = require('../model/getWidget');
const proposalController = require('../controllers/proposal');

router.get('/:widgetId', async (req, res) => {
    try {
        console.log('hit')
        const widget = await getWidget(req.params.widgetId);
        res.status(200).send({
            message: 'Widget successfully retrieved',
            data: widget
        });
    } catch (err) {
        res.status(404).send({message: 'Could not find the widget', data: {}})
        console.log(err)
    }
})

router.post('/:widgetId/create-proposal', controllers.createProposalController);
router.post('/:widgetId/contact', controllers.createContactController)
router.put('/proposal/:proposalId/agree', proposalController.agree);

module.exports = router;