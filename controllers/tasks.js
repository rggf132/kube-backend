import express from "express";
import {
  getTasks,
  insertTask,
  deleteTask,
  updateTask
} from "../database/actions";

const router = express.Router();

router.get("/", (req, res) => {
  getTasks()
    .then(tasks => {
      res.send(tasks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Error getting tasks");
    });
});

router.post("/", (req, res) => {
  const task = req.body;

  insertTask(task)
    .then(task => {
      res.send(task);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Error creating task");
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const task = req.body;

  updateTask(id, task)
    .then(task => {
      res.send(task);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Error updating task");
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  deleteTask(id)
    .then(result => {
      if (result === 0) {
        return res.status(404).send("Task does not exist");
      }
      res.send("Task deleted");
    })
    .error(error => {
      console.log(error);
      res.status(500).send("Error deleting task");
    });
});

module.exports = router;
