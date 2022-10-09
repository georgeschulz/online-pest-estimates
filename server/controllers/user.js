const createBusiness = require('../model/createBusiness');
const getUserById = require('../model/getUserById');
const updateBusiness = require('../model/updateBusiness');

const getUserInformation = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await getUserById(userId)
        res.status(200).send({ message: 'Successfully retrieved the user', data: user })
    } catch (err) {
        res.status(404).send({
            "message": "Error: The user could not be found",
            "data": {}
          })
        console.log(err);
    }   
}

const createBusinessRecord = async (req, res, next) => {
    try {
        const { name, phone, hexPrimary, hexSecondary } = req.body;
        const userId = req.user.user_id;
        const business = await createBusiness(name, userId, phone, hexPrimary, hexSecondary);
        res.status(201).send({
            message: 'Business was created',
            data: business
        })
    } catch (err) {
        res.status(400).send({ data: 'There was a problem creating the business', data: {}})
    }
}

const updateBusinessRecord = async (req, res, next) => {
    try {
        const { name, phone, hexPrimary, hexSecondary } = req.body;
        const userId = req.user.user_id;
        const business = await updateBusiness(name, phone, hexPrimary, hexSecondary, userId);
        res.status(200).send({
            message: 'Successfully updated the business',
            data: business
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: 'There was a problem updating the business',
            data: {}
        })
    }
}

module.exports = {
    getUserInformation,
    createBusinessRecord,
    updateBusinessRecord
}