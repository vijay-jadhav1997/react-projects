import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import { ThemeContext } from './contexts/ThemeContext'
import './styles/Style.css'


const App = () => {
  const[isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('theme'))|| true)

  
  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  )
}

export default App