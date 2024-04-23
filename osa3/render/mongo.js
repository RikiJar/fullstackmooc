const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook-app-demo'

const url =
  `mongodb+srv://rikijarvinen:${password}@cluster0.t97mt6v.mongodb.net/${dbName}
  ?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length < 4) {
    Note.find({important: true}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
    return
}

const note = new Note({
  content: [
    process.argv[3],
    process.argv[4]
    ].join(' '),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})