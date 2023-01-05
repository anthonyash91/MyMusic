import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

import MainPage from '../MainPage/MainPage'
import AuthPage from '../AuthPage/AuthPage'

function App () {
  const [user, setUser] = useState(getUser())
  
  return (
    <>
      <main className='App'>
        {
          user ? 
            <>
              <Routes>
                <Route path='/' element={<MainPage />} />
              </Routes>
            </> : 
          <AuthPage setUser={setUser} />
        }
      </main>
    </>
  )
}

export default App
