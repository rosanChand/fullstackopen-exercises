const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)
  if (!blog.title || ! blog.url){
    response.status(400).end()
  }
  try{
  const result = await blog.save()
  response.status(201).json(result)
} catch (ex){
  next(ex)
}
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(ex){
    next(ex)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedblog)
})


module.exports = blogsRouter