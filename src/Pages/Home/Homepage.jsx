import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import electronics from '/public/assets/electronics.webp';
import jewelary from '/public/assets/Jewelary.webp';
import mensClothing from '/public/assets/LCM-Street-Style-Day3-16-GQ-11Jan16_Robert-Spangle_.webp';
import womanClothing from '/public/assets/pexels-olly-3760042.jpg';

import PropTypes from "prop-types";
import "./Homepage.css";


Category.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default function Homepage(){
    const [categories, setCategories] = useState([]);
    const categoriesPhotos = [
        {id: 1, img: electronics},
        {id: 2, img: jewelary},
        {id: 3, img: mensClothing},
        {id: 4, img: womanClothing}]

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=> setCategories(json))
    }, [])

    return(
        <div className="home-page">
            <div className="page-cover">
                <div className="page-cover-img"></div>
                <span id="mainspan">Home</span>
            </div>
            <div className="categories">
                <header>Categories</header>
                <div className="categories-repr">
                    {
                        categories.map((category, index) => (
                            <Link to={`/shop/${category}`} key={index} className="category">
                                <Category title={category} img={categoriesPhotos[index].img}/>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function Category({title, img}) {
    return(
        <div >
            <img src={img}></img>
            <span>{title}</span>
        </div>
    )
}
