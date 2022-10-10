const createWidget = require('../model/createWidget');

const createWidgetController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const newWidget = await createWidget(userId);
        console.log('success');
        res.status(201).send({
            message: 'The widget has been created',
            data: newWidget
        })
    } catch (err) {
        res.status(400).send({
            message: 'There was a problem creating the widget',
            data: {}
        })
        console.log(err)
    }
}

module.exports = {
    createWidgetController
}