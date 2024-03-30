const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    }
  ]

const generateId = () => {
  const id = Math.floor(Math.random() * 1932)
  if(notes.find(info => info.id === id)) {
    return generateId()
  }
  return id
}

app.use(express.json())

morgan.token('req-body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[name-length] - :response-time ms :req-body'));

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
  <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personInfo = notes.find(info => info.id === id)
  if (personInfo) {
    response.json(personInfo)
  } else {
    console.log("not found")
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(info => info.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'missing name'
    })
  }
  if(notes.find(info => info.name === body.name)) {
    return response.status(400).json({
      error: 'must have unique name'
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  notes = notes.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})