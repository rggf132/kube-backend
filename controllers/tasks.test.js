import request from 'supertest'

jest.mock('../database/actions',() => {

    const TEST_TASK = { title:"test task" }

    return {
        getTasks: () => {
            return Promise.resolve(TEST_TASK)
        },
        insertTask: (task) => {
            return Promise.resolve(TEST_TASK)
        },
        deleteTask: (id) => {
            return Promise.resolve(1)
        },
        updateTask: (id,task) => {
            return Promise.resolve(TEST_TASK)
        }
    }

})

import app from "../index"

afterAll(() => {
    app.close()
})

describe('Get tasks endpoint',() => {

    test('Endpoint returns', async () => {

        const res = await request(app)
            .get('/tasks')

        expect(res.status).toEqual(200)

    })

})

describe('Post tasks endpoint',() => {

    test('Endpoint returns', async () => {

        const res = await request(app)
            .post('/tasks')
            .send({ title:"new title", description:"new description" })

        expect(res.status).toEqual(200)

    })

})

describe('Put tasks endpoint', () => {

    test('Endpoint returns', async () => {

        const res = await request(app)
            .put('/tasks/1')
            .send({ title:"updated title" })

        expect(res.status).toEqual(200)

    })

})

describe('Delete tasks endpoint', () => {

    test('Endpoint returns', async () => {

        const res = await request(app)
            .del('/tasks/1')

        expect(res.status).toEqual(200)

    })

})