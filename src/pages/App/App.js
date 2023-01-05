// import './App.css';
import MainPage from '../MainPage/MainPage';
import AuthPage from '../AuthPage/AuthPage'
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';

import { Routes, Route } from 'react-router-dom'
// import { diffIndexes } from '../models/todo';

function App() {
    const [user, setUser] = useState(getUser())
    
    return (
        <>
         <main className="App">
      {
        user ?
        <>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
              
        </>
    )
}

export default App;