import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import LandingPage from "./pages/landingPage";
import MapBar from "./pages/map";


import DashboardPage from './pages/dashboardPage';


function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={ <LandingPage/>} />
            <Route path="/map" element={<MapBar />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
