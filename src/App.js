// DONE: Add logout route
// DONE: Connect everything to MongoDB instead of json-server
// DONE: Reverse blogs so that new posts would be at the top
// DONE: Add server side checks to see if a user tries to delete other users' posts, make sure deletion only works on his posts
// DONE: Add profile pictures
// DONE: Beautify home page
// DONE: Add sorting feature
// DONE: Beautify post creation page
// DONE: Beautify post itself page
// DONE: Make pinned messages go on top
// DONE: Add profile page
// DONE: Style Profile Page & Add User properties
// DONE: Fix avatars so that they will show the correct ones for users / ON HOLD => API for pictures
// DONE: Learn React Context https://reactjs.org/docs/context.html#dynamic-context
// DONE: Change from POST to GET
// TODO: Add user settings page
// TODO: Likes feature
// TODO: Add admin page where you can pin posts & manage users (maybe add canPost in user model)
// TODO: Add markdown support for adding blogs, pictures in blog
// TODO: Add commenting system
// TODO: Add edit functionality
// MINOR: Convert to axios?
// MINOR: Value=value
// MINOR: Navbar hide create post button when on create post page, show Create Post as text
// MINOR: Rearrange every component into subfolders
// MINOR: Add minimum user/password length
// MINOR: Ternary operator if DB is off

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import BlogItself from './components/BlogItself';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { UserContext } from './components/UserContext';

function App() {
  const [user, setUser] = useState({ isAuthenticated: false });

  useEffect(() => {
    const loginCheckFetch = () => {
      fetch('/api/session', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
      return user;
    };
    loginCheckFetch();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/blogs/:id" element={<BlogItself />} />
              <Route exact path="/u/:username" element={<Profile />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
