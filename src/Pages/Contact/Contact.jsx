import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

import './Contact.css';


const contactPhysicalInfos = [
    {
        id: 1, className: "address",
        title: "Address", icon: faLocationDot,
        details: "236 5th Avenue, New YorkNY10000, United States",
    },
    {
        id: 2, className: "phone",
        title: "Phone", icon: faPhone,
        details: "Mobile: +(84) 546-6789 Hotline: +(84) 456-6789",
    },
    {
        id: 3, className: "working-time",
        title: "Working Time", icon: faClock,
        details: "Monday-Friday: 9:00 - 22:00 Saturday-Sundate: 9:00-21:00",
    },
]

const contactFields = [
    {
        id: 1,
        fieldType: "text",
        placeholder: "Enter your name",
        label: "Your name",
        rule: "name"
    },
    {
        id: 2,
        fieldType: "email",
        placeholder: "Enter your email",
        label: "Email adress",
        rule: "email"
    },
    {
        id: 3,
        fieldType: "text",
        placeholder: "Enter your subject",
        label: "Subject",
        rule: "subject"
    },
]
export default function Contact() {
    return(
        <div className="contact-page">
            <div className="page-cover">
                <div className="page-cover-img">
                
                </div>
                
                <span id='mainspan'>Contact</span>
                
            </div>
            <header>
                <h1>Get In Touch With Us</h1>
                <span>
                    For more Information About Our Products And Services. Please Feel Free To Drop Us An Email.
                    Our Stuff Always Be There To Help You Out. Do Not Hesitate!
                </span>
            </header>
            <div className="contact-content">
                <div className="contact-physical">
                {
                    contactPhysicalInfos.map((info) => {
                        return(
                            <ContactPhysicalInfo 
                                key={info.id}
                                title={info.title}
                                className={info.className}
                                details={info.details}
                                icon={info.icon}
                            />
                        );
                    })
                }
                </div>
                <div className="contact-form">
                    <form>
                        {
                            contactFields.map((field) => {
                                return(
                                    <ContactField 
                                        key={field.id}
                                        rule={field.rule}
                                        placeholder={field.placeholder}
                                        label={field.label}
                                    />
                                );
                            })
                        }
                        <div className='message-input'>
                            <label htmlFor='message'>Message</label>
                            <textarea placeholder='Enter your message' type="text" id='message' required></textarea>
                        </div>
                        <div className='submit'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// Prop validation
ContactPhysicalInfo.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    details: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
};

function ContactPhysicalInfo({ className, title, icon, details }) {
    return(
        <div className={className}>
            <div className='contact-physical-icon'>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className='contact-physical-info'>
                <span className='title'>{title}</span>
                <span className='details'>
                    {details}
                </span>
            </div>
        </div>
    );
}




function ContactField({ fieldType, placeholder, label, rule }) {
    return(
        <div className={`${rule}-input`}>
            <label htmlFor={rule}>{label}</label>
            <input placeholder={placeholder} type={fieldType} id={rule} required></input>
        </div>
    );
}
// Prop validation
ContactField.propTypes = {
    fieldType: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    rule: PropTypes.string.isRequired, 
};