import { Link, Outlet } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import logo from '../../../../public/assets/Meubel House_Logos-05.png';
import cardLogo from "../../../../public/assets/Vector.png";
import { CartContext } from "../../../Contexts/CartContext";
import PropTypes from 'prop-types';
import "./Header.css";

export default function Header() {
  const [productsInCart, setProductsInCart] = useContext(CartContext);
  const [popUpDisplay, setPopUpDisplay] = useState({ display: "none" });
  const cartPopupRef = useRef(null);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setProductsInCart(savedCart); 
  }, [setProductsInCart]);

  
  useEffect(() => {
    if (productsInCart.length > 0) {
      localStorage.setItem('CartProducts', JSON.stringify(productsInCart));
    }
  }, [productsInCart]);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartPopupRef.current && !cartPopupRef.current.contains(event.target)) {
        setPopUpDisplay({ display: "none" });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const totalPrice = productsInCart.reduce((acc, product) => acc + product.price, 0);

  return (
    <>
      <header className="layoutheader">
        <div className="header-logo">
          <img id="logo" src={logo} alt="Logo" />
          <span id="logoname">Spark</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="cart-icon" onClick={() => setPopUpDisplay({ display: "block" })}>
          <img src={cardLogo} alt="Cart" />
        </div>
        
        <div className="cart-popup" style={popUpDisplay}>
          <div className="cart-card" ref={cartPopupRef}>
            <header id="shopcard">
              Shopping Cart
            </header>
            <div className="products-in-cart">
              {
                productsInCart.length > 0 ? (
                  productsInCart.map((product) => (
                    <ProductCardInCart 
                      product={product}
                      key={product.id}
                      productsInCart={productsInCart}
                      setProductsInCart={setProductsInCart}
                    />
                  ))
                ) : (
                  <div id="cardimpty">Your cart is empty</div>
                  
                )
              }
              
            </div>
            <Link to={`/cart`} onClick={() => setPopUpDisplay({display: "none"})}>
                <div id="cardpagediv"> Cart Page</div>
                </Link>
            <footer>
              <div className="nav-to-cart">
              
                
                <label>Subtotal</label>
                <span>USD: {totalPrice.toFixed(2)}</span>
              </div>
            </footer>
          </div>
        </div>
        
      </header>
      <Outlet />
    </>
  );
}

function ProductCardInCart({ product, productsInCart, setProductsInCart }) {

  function handleDeleteProductFromCart() {
    const newProducts = productsInCart.filter((p) => p.id !== product.id);
    setProductsInCart(newProducts);
    localStorage.setItem("CartProducts", JSON.stringify(newProducts));
  }

  return (
    <div className="product-repr-cart">
      <div className="delete-product" onClick={handleDeleteProductFromCart}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      <div className="product-repr-cart-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-repr-cart-details">
        <span>{product.title}</span>
        <span> {product.price}</span>
      </div>
    </div>
  );
}


ProductCardInCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  productsInCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setProductsInCart: PropTypes.func.isRequired,
};
