const { test, expect, beforeEach, describe} = require('@playwright/test')
const {loginWith} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({page,request}) => {
  
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Roshan Chand',
        username: 'roshan',
        password: 'something'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({page}) => {
    const locator = await page.getByText('Blogs')

    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page}) => {
      await loginWith(page,'roshan','something')
      await expect(page.getByText('Roshan Chand logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page}) => {
      await loginWith(page, 'roshan', 'fshkfjs')
      const errorElement = page.locator('.error')
      await expect(errorElement).toContainText('wrong credentials')
      
    })
  })
  describe('when logged in', () => {
    beforeEach(async({page}) => {
      await loginWith(page,'roshan','something')
    })

    test('a new blog can be created', async ({page})=>{
      await page.getByRole('button', {name: 'new blog'}).click()

      await page.locator('#title').fill('new blog')
      await page.locator('#author').fill('new author')
      await page.locator('#url').fill('fskjdf')

      await page.getByRole('button', {name: 'save'}).click()
      await expect(page.locator('.blogt')).toContainText('new blog')

    })

    

    test(' blog can be liked', async({page}) => {
      await page.getByRole('button', {name: 'new blog'}).click()

      await page.locator('#title').fill('new blog')
      await page.locator('#author').fill('new author')
      await page.locator('#url').fill('fskjdf')

      await page.getByRole('button', {name: 'save'}).click()
      
      await page.getByRole('button',{name:'view'}).click()
      
      await page.getByRole('button',{name:'like'}).click()

      await expect(page.locator('.blogt')).toContainText('likes 1')
    })


    describe('blog deletions', ()=>{
      beforeEach(async({page}) => {
      await page.getByRole('button', {name: 'new blog'}).click()

      await page.locator('#title').fill('new blog')
      await page.locator('#author').fill('new author')
      await page.locator('#url').fill('fskjdf')

      await page.getByRole('button', {name: 'save'}).click()
    })

      test('blog can only be deleted by th user who created it ',async({page,request}) => {
        await page.getByRole('button',{name:'logout'}).click()
        await request.post('/api/users', {
          data: {
            name: 'test',
            username: 'test',
            password: 'test'
          }
        })

        await loginWith(page,'test','test')

        await page.getByRole('button',{name:'view'}).click()
  
        await page.getByRole('button', {name:'remove'}).click()
  
        await expect(page.locator('.blogt')).toContainText('new blog')  
  
      })
    })
    test('blogs are sorted by likes in descending order', async ({ page }) => {
      
      const blogs = [
        { title: 'Blog A', author: 'Author A', url: 'urlA', likes: 5 },
        { title: 'Blog B', author: 'Author B', url: 'urlB', likes: 10 },
        { title: 'Blog C', author: 'Author C', url: 'urlC', likes: 2 },
      ];
    
      for (const blog of blogs) {
        await page.getByRole('button', { name: 'new blog' }).click();
        await page.locator('#title').fill(blog.title);
        await page.locator('#author').fill(blog.author);
        await page.locator('#url').fill(blog.url);
        await page.getByRole('button', { name: 'save' }).click();

      }
    
     
      const blogLikes = await page.$$eval('.blogt', (blogs) =>
        blogs.map((blog) => {
          const likesText = blog.querySelector('.likes').textContent;
          return parseInt(likesText.match(/\d+/)[0], 10); 
        })
      );
    
      // Check if the likes are in descending order
      const sortedLikes = [...blogLikes].sort((a, b) => b - a);
      expect(blogLikes).toEqual(sortedLikes);
    });
  

  })

  
})