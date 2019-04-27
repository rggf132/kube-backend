import {getArgument} from "./arguments";

const Sequelize = require('sequelize');

const dbuser = getArgument('dbuser')
const dbpass = getArgument('dbpass')
const dbhost = getArgument('dbhost')

const sequelize = new Sequelize(`mysql://${dbuser}:${dbpass}@${dbhost}/taskApp`);

const Task = sequelize.define('task',{
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.STRING
})

sequelize.sync()
    .then(result => {
        console.log("Database synced")
    })
    .catch(error => {
        console.log(error)
        console.log("Error syncing database")
    })

export { Task }