const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./login')
const { createBlog } = require('./createBlog')
const { create } = require('domain')

describe('blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'test',
        password: 'test123'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'test2',
        password: 'test123'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.waitForSelector('form')
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, "test", "test123")
    await expect(page.getByText('test has logged in')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, "tes", "test123")
    await expect(page.getByText('wrong credentials')).toBeVisible()
  })

  test('user can create a new blog', async ({ page }) => {
    await loginWith(page, "test", "test123")
    await createBlog(page, 'fdsfdas', 'fdsafads', 'fdsafdas')
    await expect(page.getByText('A new blog fdsfdas by fdsafads added')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "test", "test123")
    })

    test('user can like a blog', async ({ page }) => {
      await createBlog(page, 'fdsfdas', 'fdsafads', 'fdsafdas')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    describe('existing blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'fdsfdas', 'fdsafads', 'fdsafdas')
      })

      test('user can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await page.waitForTimeout(1000) // i guess i need to wait for dialog to be accepted? Have no idea how else to do it
        const blogs = await page.$$('#blog')
        expect(blogs.length).toBe(0)
      })

      describe('Different user', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await loginWith(page, "test2", "test123")
        })
    
        test('only the user who created the blog can delete it', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.locator('#removeButton')).toHaveCount(0);
        })
      })

      test('blogs are ordered by likes', async ({ page }) => {
        await createBlog(page, 'fdsfdas2', 'fdsafads2', 'fdsafdas2')
        await page.waitForTimeout(1000)
        await expect(page.getByText('fdsfdas2 fdsafads2')).toBeVisible()
        const viewButtons = await page.$$('#viewButton')
        viewButtons[0].click()
        await page.getByRole('button', { name: 'like' }).click()
        const blogs = await page.locator('#blog').all()
        expect(blogs.length).toBe(2)
        expect(await blogs[0].innerText()).toContain('fdsfdas fdsafads')
        expect(await blogs[1].innerText()).toContain('fdsfdas2 fdsafads2')
      })
    })
  })
})