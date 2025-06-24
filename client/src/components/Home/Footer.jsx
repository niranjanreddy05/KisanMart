import React from "react";
import Logo from "../assets/KisanMart.png";
import {
  
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { categories } from "../../utils/categories";

function Footer() {
  const socialLinks = [
    { name: "Youtube", icon: <FiYoutube />, link: "#" },
    { name: "LinkedIn", icon: <FiLinkedin />, link: "#" },
    { name: "Instagram", icon: <FiInstagram />, link: "#" },
    { name: "Twitter", icon: <FiTwitter />, link: "#" },
  ];
  const data = [
    {
      headerName: "Customer Support",
      links: [
        { name: "Help Center", link: "#" },
        { name: "Track Order", link: "#" },
        { name: "Returns & Exchanges", link: "#" },
        { name: "Shipping Information", link: "#" },
        { name: "FAQs", link: "#" },
        { name: "Contact Us", link: "#" },
    
      ],
    },
    {
      headerName: "Company Info",
      links: [
          { name: "About us", link: "#" },
        { name: "Careers", link: "#" },
        { name: "Press & News", link: "#" },
        { name: "Privacy Policy", link: "#" },
        { name: "Terms of Service", link: "#" },
        { name: "Affitilate Programme", link: "#" },

      ],
    },
    {
      headerName: "Support",
      links: [
        { name: "Help & Support", link: "#" },
        { name: "Trust & Safety", link: "#" },
        { name: "- Download Our App ", link: "#" },
        { name: "- Follow Us ", link: "#" },
      ],
    },
  ];
  return (
    <>
      
      <footer className="footer">
        <ul className="footer-list">
          {data.map(({ headerName, links }) => {
            return (
              <li key={headerName} className="footer-column">
                <span className="footer-header">{headerName}</span>
                <ul className="footer-links">
                  {links.map(({ name, link }) => (
                    <li key={name} className="footer-link">
                      <a href={link}>{name}</a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="footer-bottom">
          <div className="logo-container">
            <img src={Logo}  style={{width:"115px",height:"65px"}}alt="KisanMart Logo" />
          </div>
          <ul className="social-links">
            {socialLinks.map(({ icon, link, name }) => (
              <li key={name} className="social-link">
                <a href={link}>{icon}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>









      <style>
        {`
          .footer {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 4rem;
            padding-bottom: 4rem;
            height: max-content;
            border-top: 1px solid #e5e7eb;
            background-color: #f3f4f6;
          }
          @media (min-width: 640px) {
            .footer {
              padding-left: 8rem;
              padding-right: 8rem;
            }
          }
          .footer-list {
            display: flex;
            justify-content: space-between;
          }
          .footer-column {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .footer-header {
            font-weight: bold;
          }
          .footer-links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .footer-link {
            color: #404145;
          }
          .footer-bottom {
            margin-top: 3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .logo-container {
            margin-right: 0.5rem;
            margin-top: 0.5rem;
            padding-left: 0.5rem;
            width: 140px;
            margin-left: 0;
          }
          .social-links {
            display: flex;
            gap: 1.25rem;
          }
          .social-link {
            font-size: 1.25rem;
            color: #404145;
            transition: color 0.3s;
          }
          .social-link:hover {
            color: #1DBF73;
          }
        `}
      </style>
    </>
  );
}

export default Footer;