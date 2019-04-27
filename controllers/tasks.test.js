import request from 'supertest'

jest.mock('../database/connector',() => ({
    Task: {

    }
}))

import app from "../index"

afterAll(() => {
    app.close()
})

describe('Get tasks endpoint',() => {

    test('Endpoint returns', async () => {

        const res = await request(app).get('/tasks')

        expect(res.status).toEqual(200)

    })

})