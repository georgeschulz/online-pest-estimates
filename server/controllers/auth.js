const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const createUser = require('../model/createUser');

passport.use(new LocalStrategy(function verify(username, password, cb) {

}))

const signupLocal = async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);
        const user = await createUser(email, hash);
        
        res.status(201).send({
            message: 'Sucessfully created user',
            data: user
        })

    } catch(err) {
        res.status(401).send({message: 'Failed to create user', data: {}})
        console.log(err);
    }      
}

module.exports = {
    signupLocal
}