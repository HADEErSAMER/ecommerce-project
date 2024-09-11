import './Product.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { v4 as uuidv4 } from 'uuid';

export default function Product() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [productsInCart, setProductsInCart] = useContext(CartContext);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                setProductDetails(json)
            })
    }, [productId])

    
    function handleAddToCart() {
        const oldProducts = JSON.parse(localStorage.getItem("CartProducts"));
        const newProducts = [...oldProducts, {...productDetails, id: uuidv4()}];
        setProductsInCart(newProducts);
        localStorage.setItem("CartProducts", JSON.stringify(newProducts));
        console.log(`Products in cart: ${productsInCart}`)
    }

    return (
        <div className='product-page'>
            <div className='product-bar'>
                {`Home  > shop | ${productDetails.title}`}
            </div>
            <div className='product-page-details'>
                <div className='product-image'>
                    <img src={productDetails.image} alt='product image'></img>
                </div>
                <div className='product-details-info'>
                    <header>{productDetails.title}</header>
                    <span style={{display: "block"}}>{productDetails.price}$</span>
                    <span style={{display: "block"}}>{productDetails.description}</span>
                    <button onClick={handleAddToCart}>Add to cart</button>
                    <hr></hr>
                    <span id='categoryspan' style={{display: "block"}}>{`Category: ${productDetails.category}`}</span>
                    
                </div>
            </div>
            
        </div>
        
    );
}
