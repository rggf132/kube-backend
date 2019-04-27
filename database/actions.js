import { Task } from "./connector"

export const getTasks = () => {
    return Task.findAll()
}

export const insertTask = (task) => {
    return Task.create(task)
}

export const updateTask = (id,task) => {
    return Task
        .update(task,{where:{id}})
        .then(result => {
            if(result[0] === 0) {
                throw new Error("Task does not exist")
            }
            return Task.findOne({where:{id}})
        })
}

export const deleteTask = (id) => {
    return Task.destroy({where:{id}})
}