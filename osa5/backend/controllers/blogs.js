const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
      return auth.replace('Bearer ', '')
    }
    return null
  }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', async(request, response) => {
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token missing' })
        }
        
        const body = request.body
        // console.log(request.token)
        
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        // console.log(body.title, body.author, body.url, body.likes, decodedToken.id)
        const user = await User.findById(request.user.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        if(exception.name == 'ValidationError') {
            response.status(400).end()
        }
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    // console.log("------", request.params.id)
    const user = request.user
    if(!user) {
        return response.status(401).json({ error: 'Token is needed for deletion' })
    }
    // console.log(request.params.id)
    const blogUser = await Blog.findById(request.params.id)
    // console.log(blogUser.user)
    if (blogUser.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'No authorazition for deletion' })
    }
    // console.log("2")
    await Blog
        .findByIdAndDelete(request.params.id)
    // console.log("3")
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }
    const updatedBlog =
        await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter