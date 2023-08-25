import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

function Root() {
  return (
    <div className="Root">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
    return(
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    );
}

export default App;
