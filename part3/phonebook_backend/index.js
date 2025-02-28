const express = require('express')

const app = express()
app.use(express.json())



let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.get('/',(reques))
app.get('/api/persons',(request,response)=>{
    response.json(phonebook)
})
app.get('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  const match = phonebook.find(personInfo => personInfo.id == id)
  if(match){
    response.json(match)
  }else
    response.status(404).end()
})
app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  phonebook = phonebook.filter(personInfo => personInfo.id != id)
  
  response.status(204).end()

})

app.get('/info',(request,response)=>{
  const totalList = phonebook.length

  const date = new Date()
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'long',   
    month: 'long',     
    day: '2-digit',    
    year: 'numeric',   
    hour: '2-digit',   
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short' 
  });
  const timeZoneFull = Intl.DateTimeFormat().resolvedOptions().timeZone
  response.send(
    `
    <div>
      Phonebook has info for ${totalList} people

      <p>
        ${formattedDate} (${timeZoneFull})
      </p>
    </div>
    `

  )


})
const generateId = () =>{
  const maxId = phonebook.length > 0
  ? Math.max(...phonebook.map(p => Number(p.id)))
  : 0

  return String(maxId + 1)
}
const namecheck = (name) =>{
  const match = phonebook.find(p => p.name == name)
  return match? true: false
}

app.post('/api/persons',(request,response)=>{
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (namecheck(body.name)){
    return response.status(400).json({
      error: 'name already exists'
    })
  }
  const personInfo = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  phonebook = phonebook.concat(personInfo)
  response.json(personInfo)

})

const PORT = 3001
app.listen(PORT)