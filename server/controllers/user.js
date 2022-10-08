const getUserById = require('../model/getUserById');

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

module.exports = {
    getUserInformation
}