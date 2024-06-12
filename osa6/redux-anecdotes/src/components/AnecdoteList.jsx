import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { showNoti } from '../reducers/notoficationReducer'
import { handleVote } from '../reducers/anecdoteReducer'

const anecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) { return state.anecdotes }

        const lowerCased = state.filter.toLowerCase();
        return state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase()
            .includes(lowerCased))
    })

    const dispatch = useDispatch()

    const sortedAnecs = [...anecdotes].sort((a, b) => b.votes - a.votes)
    // console.log(sortedAnecs)
    
    const vote = (id) => {
        dispatch(handleVote(anecdotes.find(a => a.id === id)))
        dispatch(showNoti(`You voted ${anecdotes.find(a => a.id === id).content}`, 10))
    }

    return (
        <div>
            {sortedAnecs
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default anecdoteList;