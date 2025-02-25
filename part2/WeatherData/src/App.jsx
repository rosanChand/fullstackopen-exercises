import { useState,useEffect } from "react";
import axios from 'axios'
import List from "./components/List";


const App = () =>{
  const [data,setData] = useState([])
  const [searchName,setsearchName] = useState('')

  const handleSearch = (event) => {
    setsearchName(event.target.value)
    console.log(searchName)
  }
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
        setData(response.data)
        console.log(response.data)
    })
  },[])

  return (
    <div>
      Find Countries: <input type="text" value={searchName} onChange={handleSearch} />
      {data == []? (
        <p>Loading countries...</p>
      ) : (
        // Only render List when data is available and search query is not empty
        searchName && <List data={data} search={searchName} />
      )}
    </div>
  )
}
export default App