/* eslint-disable no-unused-vars */
import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/login.jsx';
import InfoForm from '../src/components/infoform.jsx';
import Home from '../src/components/home.jsx';
import SuccessPage from '../src/components/successpage.jsx';
import CollegePage from '../src/components/collegepage.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDetailsPage from './components/eventsdetailpage.jsx';
import ClubsPage from './components/club.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        
        {/* Add more routes as your app grows */}
        
        <Route path="/infoform" element={<InfoForm/>} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path='/collegepage' element={<CollegePage/>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        {/* <Route path="/" element={<NetworkAlarm />} /> */}
        <Route path="/events" element={<EventDetailsPage />} />
        <Route path="/club" element={<ClubsPage/>}/>
      </Routes>
    </Router>
  );
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#7e57c2',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});



export default App;
