const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
  response.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.startsWith(`Bearer `)){
//     return authorization.replace(`Bearer `,'')
//   }
//   return null
// }

blogsRouter.post('/',middleware.userExtractor, async (request, response,next) => {
  try{
    const body = request.body
  
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id){
  //   return response.status(401).json({error: 'token invalid'})
  // }

  const user = request.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes,
    user: user._id
  })
  if (!blog.title || ! blog.url){
    response.status(400).end()
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

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

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response, next) => {
  try{
    // const decodedToken = jwt.verify(request.token,process.env.SECRET)
    // if (!decodedToken.id){
    //   return response.status(401).json({error: 'token invalid'})
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else{
      return response.status(403).json({error: 'only the creater and delete this blog'})
    }
    
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