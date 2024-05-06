const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'fdhndgcvxads',
      author: 'wqzgfgw3243421',
      url: 'gasdfga132414',
      likes: 1,
    },
    {
      title: '13241342',
      author: 'asdhhdsa',
      url: '4312asdf',
      likes: 55,
    },
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('there are two blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, 2)
})

test('has to have id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  for (let id of response.body) {
    console.log(id.id)
    assert(id.id)
  }
});

test('successful post', async () => {
  const newBlog = {
    title: 'test123321',
    author: 'tefsafas',
    url: 'test123321',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log(response.body[0].title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
});

test('check if likes is given null, gives 0', async () => {
  const newBlog = {
    title: 'test123321',
    author: 'tefsafas',
    url: 'test123321',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log(response.body[(response.body.length)-1].likes)
  assert.strictEqual(response.body[(response.body.length)-1].likes, 0)
});

test('require title ', async () => {
  
  const newBlog = {
    author: 'tefsafas',
    url: 'test123321',
  }
  console.log("morooroo")
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, initialBlogs.length)
});

test('require url ', async () => {
  const newBlog = {
    title: 'test123321',
    author: 'tefsafas',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, initialBlogs.length)
});

test('deleting works ', async () => {
  const blogsStart = await Blog.find({})
  const blogDelete = blogsStart[0]
  
  await api
    .delete(`/api/blogs/${blogDelete.id}`)
    .expect(204)

  const blogsEnd = await Blog.find({})

  assert(!blogsEnd.includes(blogDelete.content))
  assert.strictEqual(blogsEnd.length, blogsStart.length - 1)
});

test('updating likes work ', async () => {
  const blogsStart = await Blog.find({})
  const blogUpdate = blogsStart[0]

  await api
    .put(`/api/blogs/${blogUpdate.id}`)
    .send({ likes: 1321 })
    .expect(200)

  const blogsEnd = await Blog.find({})
  // console.log(blogsEnd[0].likes)
  assert.strictEqual(blogsEnd[0].likes, 1321)
});

after(async () => {
  await mongoose.connection.close()
})