import { useState, useEffect } from 'react';
import { getCategories, getProducts, createOrder } from '../services/api';
import './CashierPage.css';

function CashierPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
      alert('Failed to load categories');
    }
  };

  const loadProducts = async (categoryId = null) => {
    try {
      const response = await getProducts(categoryId);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + tax).toFixed(2)
    };
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        })),
        customerName: customerName || undefined,
        paymentMethod
      };

      await createOrder(orderData);
      alert('Order placed successfully!');
      setCart([]);
      setCustomerName('');
      setPaymentMethod('cash');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotal();

  return (
    <div className="cashier-page">
      <div className="header">
        <h1>POS - Cashier</h1>
      </div>

      <div className="main-content">
        <div className="products-section">
          <div className="categories">
            <button
              className={selectedCategory === null ? 'category-btn active' : 'category-btn'}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={selectedCategory === category.id ? 'category-btn active' : 'category-btn'}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card" onClick={() => addToCart(product)}>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">🍽️</div>
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h2>Current Order</h2>
          
          <div className="customer-info">
            <input
              type="text"
              placeholder="Customer Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="customer-input"
            />
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p>${Number(item.product.price).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product.id)}>×</button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totals.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${totals.tax}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totals.total}</span>
            </div>
          </div>

          <div className="payment-method">
            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CashierPage;
