import { useState } from 'react'
import './App.css'
import Cursor from './Cursor/Cursor'
import { getData } from './Api-Helpers/testMessaje.js';
function App() {
  const urlMessage = "/message/"
  const [message , setMessage ] = useState("Press the button");
  
  async function changeMessage(){
    try{
      const result = await getData(urlMessage);
      setMessage(result);
    }
    catch(error){
      setMessage(`Sorry did noal doat: Error ${error.message}`);
    }
  }

  return (
    <>

      <Cursor/>
      <h1>{message}</h1>
      <button
        onClick={() => changeMessage()}
      >Press me</button>
    </>
  )
}

export default App
