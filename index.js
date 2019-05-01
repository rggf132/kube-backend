import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import tasksRoute from './controllers/tasks'


import authRoute from './controllers/auth'
// import passport and passport-jwt modules
import passport from 'passport'
import passportJWT from 'passport-jwt'
import { getUser } from "./database/actions";

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow'

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

// use the strategy
passport.use(strategy);



const app = express()
const port = 3000

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(passport.initialize());

//Endpoints
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

//Expose
export default app.listen(port, () => console.log(`Example app listening on port ${port}!`))