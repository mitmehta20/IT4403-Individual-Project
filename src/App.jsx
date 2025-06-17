import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header.jsx'
import Body from './Components/Body/Body'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Body/>
    </BrowserRouter>
  )
}

export default App
