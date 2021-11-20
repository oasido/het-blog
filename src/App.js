// TODO: Add logout route
// TODO: Connect everything to MongoDB instead of json-server

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import BlogItself from './components/BlogItself';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginCheckFetch = () => {
      fetch('/api/session', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isAuthenticated) {
            setIsLoggedIn(true);
            console.log('logged in');
          } else {
            setIsLoggedIn(false);
            console.log('logged off');
          }
        });
    };
    loginCheckFetch();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Create isLoggedIn={isLoggedIn} />} />
            <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
            <Route exact path="/register" element={<Register isLoggedIn={isLoggedIn} />} />
            <Route path="/blogs/:id" element={<BlogItself isLoggedIn={isLoggedIn} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
