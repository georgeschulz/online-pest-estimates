const createBusiness = require('../model/createBusiness');
const getUserById = require('../model/getUserById');
const updateBusiness = require('../model/updateBusiness');
const updateLocalAuth = require('../model/updateLocalAuth');
const bcrypt = require('bcrypt');
const getUserWidgetsModel = require('../model/getUserWidgets')


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

const updateUserAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userId = req.user.user_id;
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);
        await updateLocalAuth(email, hash, userId)
        res.status(204).send({
            message: 'Successfully updated your login information',
            data: {}
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'There was a problem updating your login info',
            data: {}
        })
    }
}

const getUserWidgets = async (req, res, next) => {
    try {
        const widgets = await getUserWidgetsModel(req.user.user_id);
        res.status(200).send({
            message: "Successfully retrieved user widgets",
            data: widgets || []
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: "There was a problem finding the user's widgets",
            data: {}
        })
    }
}

module.exports = {
    getUserInformation,
    createBusinessRecord,
    updateBusinessRecord,
    updateUserAuth,
    getUserWidgets
}