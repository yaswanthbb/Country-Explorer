import axios from "axios";
import { useEffect, useState } from "react";
import Countries from './Countries'
const App = ()=>{
  const [newName,setNewName] = useState('')
  const[countries,setCountries] = useState([])
  const[allInfo,setAllInfo] = useState([])
  const handleCountries = (event)=>{
    setNewName(event.target.value)
  }
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response =>{
      setAllInfo(response.data)
      const names = response.data.map(r => r.name.common)
      setCountries(names)
    })
  },[])
  const filteredCountries = countries.filter(data => {
    return data.toLowerCase().includes(newName.toLowerCase())
  })
  return(
    <div>
      <span>find countries</span>
      <input value = {newName}onChange={handleCountries}/>
      <Countries newName = {newName}filteredCountries={filteredCountries} allInfo = {allInfo}/>
    </div>
  )
}
export default App;
