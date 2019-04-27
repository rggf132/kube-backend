import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import tasksRoute from './controllers/tasks'

const app = express()
const port = 3000

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Endpoints
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/tasks', tasksRoute);

//Expose
app.listen(port, () => console.log(`Example app listening on port ${port}!`))