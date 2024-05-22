const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('Enter title').fill(title)
    await page.getByPlaceholder('Enter author').fill(author)
    await page.getByPlaceholder('Enter url').fill(url)
    await page.getByRole('button', { name: 'Submit' }).click()
}

export {
    createBlog
}