const {test,after,beforeEach,describe} = require('node:test')

const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)


beforeEach(async () => {

  await User.deleteMany({})
  await Blog.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })
  await user.save()

  // const noteObjects = helper.intialblogs.map(blog => new Blog(blog))
  const blogObjects = helper.initialBlogs.map(blog => new Blog({
    ...blog,
    user: user._id
  }))
  await Blog.insertMany(blogObjects)
})

describe('get requests', () => {
  

  test('returned as json', async () => {
   
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned',async () => {
    const blogs = await helper.blogsInDb()

    assert(blogs.length,helper.initialBlogs.length)
  })
})

describe('id', () => {
  test('blog uses id instead of _id',async () => {
    const blogs = await helper.blogsInDb()
    assert.ok(blogs[0].id)
  })

})

describe('post requests', () => {
  let headers
  beforeEach(async () => {
    const newUser = {
      username: 'root',
      password: 'password',
    }
    const result = await api
      .post('/api/login')
      .send(newUser)

      headers = {
        'Authorization': `Bearer ${result.body.token}`
      }
  })
  test('a new blog can be added',async () => {
    const newBlog = {
      title: 'something',
      author:'someone',
      url:'dsjk',
      likes:0
    }
  
    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('content-Type',/application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.title)

    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length + 1)

    assert(contents.includes('something'))

  })

  test('new entry to db withour likes have default 0', async () => {
    const newBlog = {
      title: 'something',
      author:'someone',
      url:'dsjk',
    }
  
    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('content-Type',/application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const addedblog = blogsAtEnd.find(b => b.title === 'something')

    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length + 1)
    assert.ok(addedblog)
    assert.strictEqual(addedblog.likes,0)
  })

  test('if title or url is missing get status code 400', async () => {
    const newBlog = {
      author:'someone',
      
    }
  
    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400) 
  })
 
 
  
})

describe('delete request',() => {
  let headers
  beforeEach(async () => {
    const newUser = {
      username: 'root',
      password: 'password',
    }
    const result = await api
      .post('/api/login')
      .send(newUser)

      headers = {
        'Authorization': `Bearer ${result.body.token}`
      }
  })
  test('a blog can be deleted', async () => {
   
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.map(n => n.title)
      assert(!contents.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    
  })
})

describe('put request',() => {
  test('a blog can be updated', async () => {
   
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const toUpdate = {
        title: 'new',
        author: 'new',
        url:'new'
      }
    
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(toUpdate)
        .expect(200)
    
      const blogsAtEnd = await helper.blogsInDb()
      const updatedblog = blogsAtEnd.find(b => b.title === 'new')
      assert.notDeepStrictEqual(updatedblog,blogToUpdate)
      
  })
})



after(async () => {
  await User.deleteMany({}) // Clear all users after each test
  await Blog.deleteMany({}) 
  await mongoose.connection.close()
})