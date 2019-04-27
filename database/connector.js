const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:ke7zkmLIm8DchOPA@35.234.141.205/taskApp');

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