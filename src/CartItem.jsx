import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcular costo total del carrito
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      return total + numericCost * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert("Próximamente - Funcionalidad de pago en desarrollo");
  };

  return (
    <div className="cart-item-container">
      <h2>Carrito de Compras</h2>
      <h3>Total a Pagar: ${calculateTotalCost()}</h3>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => {
            const unitPrice = parseFloat(item.cost.replace('$', ''));
            const subtotal = (unitPrice * item.quantity).toFixed(2);

            return (
              <div key={index} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Precio Unitario: {item.cost}</p>
                  <p>Subtotal: ${subtotal}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continuar Comprando
        </button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>
          Pago
        </button>
      </div>
    </div>
  );
}

export default CartItem;
