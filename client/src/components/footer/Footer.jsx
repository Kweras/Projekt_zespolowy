import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Marek Jaśkowiak, Kacper Nowak, Amadeusz Podlejski, Marcin Ptok & Chat GPT &copy; {currentYear}</p>
                <ul className="social-icons">
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
