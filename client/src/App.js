import logo from './logo.svg';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div style={{ width: "393px", margin: "0 auto" }}><Home /> </div>} />
          <Route path="/dashboard" element={<Dashboard /> }/>
        </Routes>
      </BrowserRouter>

      {/* <Dashboard /> */}
    </>

  );
}

export default App;
