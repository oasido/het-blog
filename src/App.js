import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogItself from './components/BlogItself';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/blogs/:id" element={<BlogItself />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
