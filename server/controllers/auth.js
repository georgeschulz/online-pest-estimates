const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const createUser = require('../model/createUser');
const getUserById = require('../model/getUserById');
const getAuthCredentials = require('../model/getAuthCredentials');

passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    async function verify(username, password, cb) {
    try {        
        const user = await getAuthCredentials(username);
        if(user.length <= 0) {
            return cb(null, false, { message: 'Incorrect username or password' })
        } else {
            bcrypt.compare(password, user[0].password, function (err, check) {
                if(err) {
                    return cb()
                } else if (check) {
                    return cb(null, { userId: user[0].user_id });
                } else {
                    return cb(null, false);
                }
            })
        }
    } catch (err) {
        cb(err);
    }
}));

passport.serializeUser(function(user, done) { 
    done(null, user.userId);
})

passport.deserializeUser(async function(user_id, done) {
    try {
        const user = await getUserById(user_id);
        done(null, user);
    } catch(err) {
        console.log(err);
    }
})

const signinLocal = async (req, res) => {
    res.status(200).send({message: 'Successfully logged in'});
}

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
    signupLocal,
    signinLocal
}