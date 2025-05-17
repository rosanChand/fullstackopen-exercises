import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => 
  axios.get(baseUrl).then(res => res.data)

export const createNew = async (newAnecdote) => {
  try{
  const response = await axios.post(baseUrl,newAnecdote)
  return response.data
  }
  catch (error) {
    throw new Error( error.response.data.error)
  }
}

export const update = (obj) => 
  axios.put(`${baseUrl}/${obj.id}`,{...obj,votes: obj.votes + 1}).then(r => r.data)