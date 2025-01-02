/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Lazy Loading Components
const Login = lazy(() => import("../src/components/login.jsx"));
const InfoForm = lazy(() => import("../src/components/infoform.jsx"));
const Home = lazy(() => import("../src/components/home.jsx"));
const SuccessPage = lazy(() => import("../src/components/successpage.jsx"));

// Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#7e57c2",
    },
    secondary: {
      main: "#3f51b5",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/infoform" element={<InfoForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            {/* 404 Route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
