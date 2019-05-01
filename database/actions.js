import { Task, User } from "./connector"

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

// create some helper functions to work on the database
export const createUser = async ({ email, password }) => {
    return await User.create({ email, password })
}
export const getAllUsers = async () => {
    return await User.findAll();
}
export const getUser = async obj => {
    return await User.findOne({
        where: obj,
    })
}
export const loginUser = async ({email, password}) => {
    if (email && password) {
        // we get the user with the name and save the resolved promise returned
        return await getUser({ email })

    }
}

export const deleteTask = (id) => {
    return Task.destroy({where:{id}})
}
