import PropTypes from 'prop-types';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faTruckFast, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';


const footerFeatures = [
    {
        id: 1, icon: faTrophy,
        title: "High Quality", details: "Crafted from top materials",
    },
    {
        id: 2, icon: faCircleCheck,
        title: "Warranty Protection", details: "Over 2 years",
    },
    {
        id: 3, icon: faTruckFast,
        title: "Free Shipping", details: "Order over 150$",
    },
    {
        id: 4, icon: faHeadset,
        title: "24 / 7 Support", details: "Dedicated support",
    },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-features">
                {footerFeatures.map((feature) => (
                    <FooterFeature 
                        key={feature.id}
                        icon={<FontAwesomeIcon icon={feature.icon} />}
                        title={feature.title}
                        details={feature.details}
                    />
                ))}
            </div>
            <div className="footer-nav">
                <div className='footer-shop-details'>
                    <span>Spark</span>
                    <span>
                        400 University Drive Suite 200 Coral<br></br> Gables,
                        FL 33134 USA
                    </span>
                </div>
                <div className='footer-links'>
                    <span>Links</span>
                    <ul>
                        <li ><a href='/home'>Home</a></li>
                        <li ><a href='/shop'>Shop</a></li>
                        <li ><a href='/about'>About</a></li>
                        <li ><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
                <div className='footer-help'>
                    <span>Help</span>
                    <ul>
                        <li ><a href='/'>Payment Option</a></li>
                        <li ><a href='/'>Returns</a></li>
                        <li ><a href='/'>Privacy Policy</a></li>
                    </ul>
                </div>
                <div className='footer-newsletter'>
                    <span>Newsletter</span>
                    <form className='footer-newsletter-field'>
                        <input type='text' placeholder='Enter your email address'></input>
                        <button type='submit'>Subscribe</button>
                    </form>
                </div>
            </div>
            <hr></hr>
            <div className="footer-rights">2023 Spark. All rights reserved</div>
        </footer>
    );
}

function FooterFeature({ icon, title, details }) {
    return (
        <div className="footer-feature">
            <div className="feature-icon">{icon}</div>
            <div className="feature-info">
                <span>{title}</span>
                <span>{details}</span>
            </div>
        </div>
    );
}


FooterFeature.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
};
