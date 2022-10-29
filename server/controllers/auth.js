const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const bcrypt = require('bcrypt');
const createUser = require('../model/createUser');
const getUserById = require('../model/getUserById');
const getAuthCredentials = require('../model/getAuthCredentials');
const db = require('../model/db');

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


passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLECLIENTID'],
    clientSecret: process.env['GOOGLECLIENTSECRET'],
    callbackURL: process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com/auth/recieve-google' : 'http://localhost:4000/auth/recieve-google'
},
function (issuer, profile, cb) {
    //check to see if a user with these google credentials exists
    console.log('hit')
    db.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [
        issuer,
        profile.id
    ], function (err, cred) {
        if (err) { return cb(err) }
        //if we can't find the user, make a new user
        if (cred.rowCount === 0) {
            console.log('none found')
            //create a user with the info from google and a timestamp. When this happens, we need to collect more complete user information before going through the signup flow
            db.query('INSERT INTO users (email) VALUES ($1) RETURNING user_id', [profile.emails[0].value], function (err, result) {
                console.log('insert')
                if (err) { return cb(err) }
                let id = result.rows[0].user_id;
                //create and link their google credentials in the federated credentials table (which stores social logins)
                db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)', [
                    id,
                    issuer,
                    profile.id
                ], function (err) {
                    if (err) { return cb(err); }
                    //now log the user in by returning their customerId for serializing and deserializing
                    let user = {
                        userId: id.toString()             
                    };
                    console.log(user)
                    return cb(null, user);
                })
            })
        } else {
            //the google account has previously logged in to the app. Get the linked user
            console.log({userId: cred.rows[0].user_id})
            return cb(null, {userId: cred.rows[0].user_id})
        } 
    })
})); 

const recieveGoogleRedirect = (req, res) => {
    console.log('recieved')
    if(process.env.NODE_ENV === 'production') {
        res.redirect('/authorize?goto=signup/2')
    } else {
        res.redirect('http://localhost:3000/authorize?goto=signup/2');
    }
}

passport.serializeUser(function(user, done) { 
    console.log(user)
    done(null, user.userId);
})

passport.deserializeUser(async function(user_id, done) {
    try {
        const user = await getUserById(user_id);
        user.user_id = user_id;
        done(null, user);
    } catch(err) {
        console.log(err);
    }
})

const signinLocal = async (req, res) => {
    try {
        const user = await getUserById(req.user.userId);
        res.status(200).send({message: 'Successfully logged in', data: user });
    } catch (err) {
        res.status(400).send({message: 'Could not find the user details after logging in', data: {}})
    }
    
}

const signupLocal = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);
        const users = await createUser(email, hash);
        
        req.login({ userId: users[0].user_id }, async (err) => {
            if(err) {
                console.log(err)
            } else {
                //get the user
                const user = await getUserById(users[0].user_id) 
                res.status(201).send({
                    message: 'User created',
                    data: user
                });
            }
        }) 
    } catch(err) {
        res.status(401).send({message: 'Failed to create user', data: {}})
        console.log(err);
    }      
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err)
        } else {
            res.status(200).send({ message: 'User has been logged out', data: {}})
        }
    })
}

module.exports = {
    signupLocal,
    signinLocal,
    logout,
    recieveGoogleRedirect
}