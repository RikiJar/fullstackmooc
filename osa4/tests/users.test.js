const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
    {
        username: 'test1232133121221',
        name: 'rikijar123',
        password: 'test123'
    },
    {
        username: 'test1232133121221',
        name: 'rikijar',
        password: 'test'
    },
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

test('Username needs 3 characters at least', async () => {
    const newUser = {
        username: 'te',
        name: 'rikijar',
        password: '1234'
    }
    
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    // console.log(usersAtEnd)
    assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

test('Password needs 3 characters at least', async () => {
    const newUser = {
        username: 'test',
        name: 'rikijar',
        password: '12'
    }
    
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
    const usersAtEnd = await User.find({})
    // console.log(usersAtEnd)
    assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

after(async () => {
  await mongoose.connection.close()
})