const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

const tasksRoute = require('./controllers/tasks')
app.use('/tasks', tasksRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))