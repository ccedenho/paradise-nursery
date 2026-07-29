import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  // Al menos 6 plantas únicas divididas en 3 categorías
  const plantsArray = [
    {
      category: "Purificadoras de Aire",
      plants: [
        { name: "Planta Serpiente", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$15", description: "Produce oxígeno por la noche." },
        { name: "Lirio de la Paz", image: "https://images.unsplash.com/photo-1593482892290-f5654477437c?w=300", cost: "$18", description: "Excelente para eliminar toxinas." }
      ]
    },
    {
      category: "Aromáticas",
      plants: [
        { name: "Lavanda", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$12", description: "Aroma relajante y flores hermosas." },
        { name: "Romero", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300", cost: "$10", description: "Ideal para cocina y decoración." }
      ]
    },
    {
      category: "Suculentas",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509205477838-a534e43a849f?w=300", cost: "$8", description: "Propiedades medicinales y bajo cuidado." },
        { name: "Echeveria", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", cost: "$9", description: "Forma de roseta muy decorativa." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-list-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#plantas">Plantas</a>
          <a href="#cart" className="cart-icon-link">
            🛒 Carrito <span className="cart-count">{totalCartItems}</span>
          </a>
        </div>
      </nav>

      {/* Listado de Productos por Categoría */}
      <div className="categories-section">
        <h2>Nuestras Plantas</h2>
        {plantsArray.map((category, index) => (
          <div key={index} className="category-group">
            <h3>{category.category}</h3>
            <div className="plants-grid">
              {category.plants.map((plant, pIndex) => (
                <div key={pIndex} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-img" />
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <p className="plant-price">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Agregado' : 'Agregar al Carrito'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
