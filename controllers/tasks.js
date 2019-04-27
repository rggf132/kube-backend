import express from 'express'
import { getTasks, insertTask, deleteTask, updateTask } from "../database/actions"

const router = express.Router();

router.get('/', (req, res) => {
    getTasks()
        .then(tasks => {
            res.send(tasks)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error getting tasks')
        })
})

router.post('/', (req,res) => {
    const task = req.body

    insertTask(task)
        .then(result => {
            res.send('Created task')
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error creating task')
        })
})

router.put('/:id', (req,res) => {
    const id = req.params.id
    const task = req.body

    updateTask(id,task)
        .then(result => {
            res.send(`Updated task`)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error creating task')
        })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id

    deleteTask(id)
        .then(result => {
            res.send('Deleted task')
        })
        .error(error => {
            console.log(error)
            res.status(500).send('Error deleting task')
        })
})

module.exports = router;