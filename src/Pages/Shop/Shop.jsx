import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Shop.css';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const { category } = useParams();

    useEffect(() => {
        
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
            
            const filteredProducts = category ? json.filter(product => product.category === category) : json;
            setProducts(filteredProducts);
        });
    }, [category]);

    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage)));
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="products-shop">
            <div className="page-cover">
                <div className="page-cover-img"></div>
                <span id="mainspan">Shop</span>
            </div>
            <div className="products-setion" >
                <div className="products-presentation">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        
                    />
                   
                ))}
                 
                </div>
            </div>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
            />
        </div>
    );
}


ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.shape({
            rate: PropTypes.number,
            count: PropTypes.number
        })
    }).isRequired
};



function ProductCard({ product }) {
    const [productsInCart, setProductsInCart] = useContext(CartContext);

    
    function handleAddToCart() {
        const newProducts = [...productsInCart, {...product, id: uuidv4()}];
        setProductsInCart(newProducts);
        localStorage.setItem("CartProducts", JSON.stringify(newProducts));
    }

    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src={product.image} alt={product.title} />
                <div className="add-to-cart">
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
            <div className="product-card-info">
                <Link to={`/shop/product/${product.id}`}>
                    <header>{product.title}</header>
                </Link>
                <span>{product.price}$</span>
            </div>
        </div>
    );
}



function Pagination({ productsPerPage, totalProducts, paginate, currentPage, goToNextPage, goToPrevPage }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    
    const pagesToShow = 5; 
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                </li>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}


Pagination.propTypes = {
    productsPerPage: PropTypes.number.isRequired,
    totalProducts: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    goToPrevPage: PropTypes.func.isRequired,
};
