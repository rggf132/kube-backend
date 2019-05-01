import bCrypt from 'bcrypt-nodejs'
import express from 'express'
import { createUser, getAllUsers, getUser, loginUser } from "../database/actions"
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'

let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow'

const router = express.Router();

// get all users
router.get('/users', (req, res) => {
    getAllUsers()
        .then(user => {
            res.send(user)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error getting users')
        })
})

// register route
router.post('/register', (req, res, next) => {
    const { email, password } = req.body
    createUser({email, password})
        .then(user => {
        res.json({ user, msg: 'account created successfully' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error creating user')
        })
})

// login route
router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    loginUser({email, password})
        .then(user => {
            if (!user) {
                res.status(401).json({ msg: 'No such user found', user })
            }
            if (user.password === password) {
                // from now on we’ll identify the user by the id and the id is
                // the only personalized value that goes into our token
                let payload = { id: user.id }
                let token = jwt.sign(payload, jwtOptions.secretOrKey)
                res.json({ msg: 'ok', token: token })
            } else {
                res.status(401).json({ msg: 'Password is incorrect' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error logging user in')
        })
})

module.exports = router;