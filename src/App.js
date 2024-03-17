import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TravelingSalesperson from "./Pages/TravelingSalesperson";
import ColoracionGrafos from "./Pages/ColoracionGrafos/ColoracionGrafos";
import Clique from "./Pages/Clique/Clique";

function App() {
  const fullMenuRef = useRef(null);
  const [tutorialIniciado, setTutorialIniciado] = useState(false);

  useEffect(() => {}, []);

  const handleIniciarTutorial = () => {
    setTutorialIniciado(true);
    const fullMenu = fullMenuRef.current;
    fullMenu.style.left = '0';
  };

  const handleCloseMenu = () => {
    const fullMenu = fullMenuRef.current;
    fullMenu.style.left = '-100%';
  };
  return (
    <Router>
      <div className="main">
        {!tutorialIniciado && (
          <header>
            <div className="wrap">
              <img src="img/logo1.png" alt="" />
              {/* Botón eliminado */}
            </div>
          </header>
        )}
        {!tutorialIniciado && (
          <section className="seccion1">
            <div className="wrap">
              <section className="caption-main">
                <h1>Análisis de Algoritmos NP</h1>
                <a href="#" className="btn-view" onClick={handleIniciarTutorial}>Ver Ejercicios</a>
              </section>
            </div>
          </section>
        )}
        <div className="full-menu" ref={fullMenuRef}>
          <div className="wrap">
            <nav className="navegacion">
              <ul className="menu-principal">
                <li onClick={handleCloseMenu}><Link to="/traveling-salesperson">Traveling Salesperson</Link></li>
                <li onClick={handleCloseMenu}><Link to="/coloracion-grafos">Coloración de Grafos</Link></li>
                <li onClick={handleCloseMenu}><Link to="/clique">Clique</Link></li>
              </ul>
              <div className="social-items">
                <a href="#" className="fa fa-youtube-play"></a>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-twitter"></a>
              </div>
            </nav>
            <section className="menu-text">
              <p>Para profundizar en la comprensión de problemas NP, 
                se elaboraron tres algoritmos distintos. Este enfoque no 
                solo ilumina las metodologías adoptadas sino que también 
                destaca los logros específicos alcanzados. A través de este 
                análisis, se desentrañan tanto las estrategias efectivas como 
                los retos significativos que surgen al buscar soluciones a problemas 
                de complejidad NP, ofreciendo así una visión integral de la materia.</p>
            </section>
          </div>
        </div>
        {tutorialIniciado && (
          <div className="wrapper">
            <Routes>
              <Route path="/traveling-salesperson" element={<TravelingSalesperson />} />
              <Route path="/coloracion-grafos" element={<ColoracionGrafos />} />
              <Route path="/clique" element={<Clique />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
