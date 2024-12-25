import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/login.jsx';
import InfoForm from '../src/components/infoform.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        
        {/* Add more routes as your app grows */}
        
        <Route path="/infoform" element={<InfoForm/>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
