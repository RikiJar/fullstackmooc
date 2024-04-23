const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')
app.use(cors())
app.use(express.static('dist'))

const generateId = () => {
  const id = Math.floor(Math.random() * 1932)
  if(notes.find(info => info.id === id)) {
    return generateId()
  }
  return id
}

app.use(express.json())

app.get('/api/persons', (request, response, next) => {
  Note.find({}).then(notes => {
    response.json(notes)
  }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
  <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    name: body.name,
    number: body.number,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const note = {
    name: body.name,
    number: body.number
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})