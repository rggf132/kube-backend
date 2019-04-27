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

})

router.put('/', (req,res) => {

})

router.delete('/', (req,res) => {

})

module.exports = router;