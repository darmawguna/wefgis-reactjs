import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

// import LandingPage from "./pages/landingPage";
// import MapBar from "./pages/map";


import DashboardPage from './pages/dashboardPage';
import UserManagementComponent from './components/dashboard/UserManagementComponent';
import SensorManagementComponent from './components/dashboard/SensoManagementComponent';
import DashboardComponent from './components/dashboard/DashboardComponent';


import HomePage from './pages/homepage/homepage';
import MapPage from './pages/mappage/mappage';


function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path='' element={<DashboardComponent />} />
              <Route path="user-management" element={<UserManagementComponent />} />
              <Route path="sensor-management" element={<SensorManagementComponent />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
