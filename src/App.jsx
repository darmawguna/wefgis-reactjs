import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import LandingPage from "./pages/landingPage";
import MapBar from "./pages/map";

import PageTesting from './pages/pageTesting';


function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={ <LandingPage/>} />
            <Route path="/map" element={<MapBar />} />
            <Route path="/testing" element={<PageTesting/>} />
            
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
