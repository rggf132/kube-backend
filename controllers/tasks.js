import express from 'express'
import { getTasks, insertTask, deleteTask, updateTask } from "../database/actions"

const router = express.Router();

router.get('/', (req, res) => {
    getTasks()
        .then(tasks => {
            res.send(tasks)
        })
        .catch(error => {
            res.status(500).send({message:error.message})
        })
})

router.post('/', (req,res) => {
    const task = req.body
    console.log(task)

    res.send('Created task')
})

router.put('/:id', (req,res) => {
    const id = req.params.id
    const task = req.body
    console.log(task)

    res.send(`Updated task ${id}`)
})

router.delete('/:id', (req,res) => {
    const id = req.params.id

    res.send(`Deleted task ${id}`)
})

module.exports = router;