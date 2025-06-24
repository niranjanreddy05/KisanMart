import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import business1 from "../assets/business.jpg";
import Logo from "../assets/KisanMart.png";

function KisanMarketBusiness() {
  return (
    <>
    
      <div className="container">
        <div className="text-section">
          <div className="logo-title">
            <div className="logo-container">
              <img src={Logo} alt=" Logo" />
            </div>
            <span className="title">Become a Seller</span>
          </div>
          <h2 className="heading">Every step of growth is a step toward Success</h2>
          <h4 className="subheading">
            Stay near the people who value your work
          </h4>
          <ul className="feature-list">
            <li className="feature-item">
              <BsCheckCircle className="check-icon" />
              <span>Get Orders direct from Customers</span>
            </li>
            <li className="feature-item">
              <BsCheckCircle className="check-icon" />
              <span>Personalized Support by our Team</span>
            </li>
            <li className="feature-item">
              <BsCheckCircle className="check-icon" />
              <span>Get good price for your hardwork</span>
            </li>
            <li className="feature-item">
              <BsCheckCircle className="check-icon" />
              <span>Clean and Safety Process</span>
            </li>
          </ul>
          <button className="button" type="button">
            Explore KisanMarket
          </button>
        </div>
        <div className="image-section">
          <img src={business1} alt="business" className="business-image" />
        </div>
      </div>







        <style>
        {`
          .container {
  background-color: #E6F7FA; /* Updated to soft teal */
  padding-left: 2.5rem; /* Ensures 40px left padding on small screens */
  padding-right: 2.5rem; /* Ensures 40px right padding on small screens */
  display: flex;
  flex-wrap: wrap;
  color: black;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 4rem;
  margin-left: 4.2rem;
  gap: 2rem;
}
          @media (min-width: 640px) {
            .container {
              padding-left: 3rem; /* Ensures 48px left padding on ≥640px screens */
              padding-right: 3rem; /* Ensures 48px right padding on ≥640px screens */
            }
          }
          .text-section {
            margin-top:-63px;
            color: black;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            justify-content: center;
            align-items: flex-start;
          }
          .logo-title {
            display: flex;
            gap: 0.5rem;
          }
          .logo-container {
            margin-right: 0.5rem;
            margin-top: 0.5rem;
            padding-left: 0.5rem;
            width: 160px;
            margin-left: 0;
          }
          .title {
            color: Black;
            font-size: 1.875rem;
            font-weight: bold;
          }
          .heading {
            font-size: 1.875rem;
            font-weight: bold;
            color:rgb(113, 130, 130);;
          }
          .subheading {
            font-size: 1.25rem;
          }
          .feature-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .feature-item {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          .check-icon {
            color: #62646a;
            font-size: 1.5rem;
          }
          .button {
            border: 1px solid #1DBF73;
            background-color: #1DBF73;
            color: white;
            font-size: 1rem;
            font-weight: 500;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
          }
          .image-section {
            position: relative;
            padding-top: 7rem;
            height: 512px;
            width: 100%;
            margin-top:-10px;
          }
          @media (min-width: 640px) {
            .image-section {
              width: 33.333333%;
            }
          }
          .business-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            margin-top:-80px;
          }
        `}
      </style>
    </>
  );
}

export default KisanMarketBusiness;