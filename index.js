import express from 'express'

//Routes
import tasksRoute from './controllers/tasks'

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/tasks', tasksRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))