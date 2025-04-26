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


module.exports = blogsRouter