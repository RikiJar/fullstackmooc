import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import BlogCreationForm from './BlogCreationForm'

test('renders content', () => {
    const blog = {
        title: 'test123',
    }
    render(<Blog blog={blog} />)
    const element = screen.getByText('test123')
    expect(element).toBeDefined()
})

test('if more is shown', async () => {
    const blog = {
        title: 'test123',
        author: 'test',
        url: "fsdafds",
        likes: 5,
        user: {
            username: "test1221"
        }
    }
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const url = screen.getByText('fsdafds')
    expect(url).toBeDefined()
    const likes = screen.getByText('5 likes')
    expect(likes).toBeDefined()
    const username = screen.getByText('Added by test1221')
    expect(username).toBeDefined()
})

test('if like button is clicked twice', async () => {
    const blog = {
        title: 'test123',
        author: 'test',
        url: "fsdafds",
        likes: 5,
        user: {
            username: "test1221"
        }
    }
    const mockHandler = vi.fn()
    render(<Blog blog={blog} onLike={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    await user.click(likebutton)
    expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('if new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogCreationForm createBlog={createBlog} setNewBlog={false}/>)
    const title = screen.getAllByRole('textbox')[0]
    const author = screen.getAllByRole('textbox')[1]
    const url = screen.getAllByRole('textbox')[2]
    const submit = screen.getAllByRole('button')[0]
    // console.log(submit)
    await user.type(title, 'test123')
    await user.type(author, 'test')
    await user.type(url, 'fdasfdas')
    await user.click(submit)
    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
        title: 'test123',
        author: 'test',
        url: 'fdasfdas'
    })
})
