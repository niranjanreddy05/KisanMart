
// Layout.jsx
import React from 'react';
import { Outlet } from "react-router-dom";
import { useAuth } from './src/context/AuthContext';
import Navbar from './src/components/Home/Navbar';
import NavMenu from './src/components/Home/NavMenu';
import Footer from './src/components/Home/Footer';
import { Toaster } from 'react-hot-toast';


const Layout = () => {
  const { currentUser } = useAuth(); 

  return (
    <div className="app">
      <Navbar currentUser={currentUser} />
      <NavMenu currentUser={currentUser} />
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
