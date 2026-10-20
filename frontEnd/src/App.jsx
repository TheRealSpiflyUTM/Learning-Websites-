import { useState } from 'react'
import './App.css'
import Cursor from './Cursor'
function App() {

  return (
    <>

      <Cursor/>
      
      <main>
        <section id='home'></section>
        <section id='about'>About you</section>
        <section id='projects'>Projects</section>
        <section id='work'>Your Work</section>
        <section id='contact'>Contact details</section>
      </main>
    </>
  )
}

export default App
