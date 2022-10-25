import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Main } from './Pages/Main/Main';
import { Login } from './Pages/Login';
import { Navbar } from './components/Navbar';
import { AddPost } from './Pages/create-post/AddPost';
function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/'  element={<Main/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/create' element={<AddPost/>} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
