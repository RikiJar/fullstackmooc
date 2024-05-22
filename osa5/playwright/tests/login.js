const loginWith = async (page, user, password) => {
    await page.getByRole('textbox').first().fill(user)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

export {
    loginWith
}