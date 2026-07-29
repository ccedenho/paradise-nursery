import React, { useState } from 'react';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Bienvenido a tu tienda de plantas en línea. Descubre la belleza de la naturaleza para tu hogar.</p>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Comenzar
            </button>
          </div>
        </div>
      ) : (
        /* Aquí se cargaría tu componente ProductList o el enrutador de la tienda */
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Catálogo de Plantas (Redirigiendo a ProductList)</h2>
        </div>
      )}
    </div>
  );
}

export default App;
