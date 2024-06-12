import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const chaneID = state.find(n => n.id === id)
      const changedAne = { ...chaneID, votes: chaneID.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAne)
    },
    append_anecdote(state, action) {
      return [...state, action.payload]
    },
    set_anecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, set_anecdotes, append_anecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set_anecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  // console.log(content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append_anecdote(newAnecdote))
  }
}

export const handleVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateAnecdote(updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer