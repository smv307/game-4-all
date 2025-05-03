import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header.js";

import Homepage from "./Pages/Homepage.js";
import Setup from "./Pages/Setup.js";
import About from "./Pages/About.js";
import GamePage from "./Pages/GamePage.js";
import ErrorScreen from "./Pages/ErrorScreen.js";

function App() {
  return (
    <Router>
      <Header />
      <ErrorScreen />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
