const {test,after,beforeEach,describe} = require('node:test')

const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
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
  test('a new blog can be added',async () => {
    const newBlog = {
      title: 'something',
      author:'someone',
      url:'dsjk',
      likes:0
    }
  
    await api
      .post('/api/blogs')
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
      .send(newBlog)
      .expect(400)
      
  })
 
 
  
})



after(async () => {
  await mongoose.connection.close()
})