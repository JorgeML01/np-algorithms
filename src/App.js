import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TravelingSalesperson from "./Pages/TravelingSalesperson";
import ColoracionGrafos from "./Pages/ColoracionGrafos/ColoracionGrafos";
import Clique from "./Pages/Clique/Clique";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/traveling-salesperson">Traveling Salesperson</Link>
          </li>
          <li>
            <Link to="/coloracion-grafos">Coloración de Grafos</Link>
          </li>
          <li>
            <Link to="/clique">Clique</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/traveling-salesperson" element={<TravelingSalesperson />} />
        <Route path="/coloracion-grafos" element={<ColoracionGrafos />} />
        <Route path="/clique" element={<Clique />} />
      </Routes>
    </Router>
  );
}

export default App;
