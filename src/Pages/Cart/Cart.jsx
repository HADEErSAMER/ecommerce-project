import './Cart.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import mainimg from "/public/assets/pexels-burst-374894.jpg"

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([]);

    
    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("CartProducts")) || [];
        setCartProducts(products);
    }, []);

    
    const totalPrice = cartProducts.reduce((acc, product) => acc + product.price, 0);

    function handleCheckOut() {
        console.log(`Checkout logic`)
    }
    return (
        <div className='cart-page'>
           
            <div className="cart-cover">
                <div className='page-cover-img'>

                     </div>
               
                <span >Cart</span>
               
            </div>
            
            <div className='cart-component'>
                <div className='cart-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartProducts.map((product) => (
                                    <ProductTableField
                                        key={product.id}
                                        product={product}
                                        cartProducts={cartProducts}
                                        setCartProducts={setCartProducts}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='checkout'>
                    <header id='carttotal'>Cart Totals</header>
                    <div>Total: {totalPrice} $</div>
                    <div>Subtotal: {totalPrice} $</div>
                    <button onClick={handleCheckOut}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

function ProductTableField({ product, cartProducts, setCartProducts }) {

    
    function cancelProductFromCart() {
        const newProducts = cartProducts.filter((p) => p.id !== product.id);
        setCartProducts(newProducts);
        localStorage.setItem("CartProducts", JSON.stringify(newProducts));
    }

    return (
        <tr>
            <td>
                <div className='product-pic-name'>
                    <img src={product.image} alt={product.title} />
                    <span>{product.title}</span>
                </div>
            </td>
            <td className='product-price'>
                <span>
                    {product.price} $
                </span>
                <span className='cancel-product' onClick={cancelProductFromCart}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </span>
            </td>
        </tr>
    );
}


ProductTableField.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    cartProducts: PropTypes.arrayOf( 
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
    setCartProducts: PropTypes.func.isRequired 
};


Cart.propTypes = {
    
};
