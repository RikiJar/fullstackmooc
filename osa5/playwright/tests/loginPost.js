const loginPost = async (page, request, name, username, password) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: name,
        username: username,
        password: password
      }
    })
    await page.goto('/')
}

export { 
    loginPost 
}