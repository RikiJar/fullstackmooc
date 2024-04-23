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

app.get('/api/persons', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
  <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(info => info.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})