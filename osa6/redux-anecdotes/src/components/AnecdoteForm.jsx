import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNoti } from '../reducers/notoficationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const anecdoteForm = () => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createAnecdote(content))
        dispatch(showNoti(`You created ${content}`, 5))
        setContent('')
    }
    
    return (
        <div>
        <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input value={content} onChange={(e) => setContent(e.target.value)}/></div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}

export default anecdoteForm;