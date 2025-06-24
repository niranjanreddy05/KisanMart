import React, { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import { IoSearchOutline } from "react-icons/io5";
import AgroLogo from "../assets/KisanMart.png";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";

function Navbar() {
  const [searchData, setSearchData] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [Open, setOpen] = useState(false);
  const [bgColorScrolling, setBgColorScrolling] = useState(false);
  const commonImageUrl = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled >= 340) {
        setScrolling(true);
      } else if (scrolled >= 40) {
        setBgColorScrolling(true);
      } else {
        setScrolling(false);
        setBgColorScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      setOpen(false);
      toast.success("user logged out successfully");
      logout();
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/posts?search=${searchData}`);
  };

  const bgColorSpring = useSpring({
    backgroundColor: bgColorScrolling ? 'white' : 'transparent',
  });

  const [searchAnimation, setSearchAnimation] = useSpring(() => ({
    opacity: scrolling ? 1 : 0,
    transform: `translateY(${scrolling ? 0 : -20}px)`,
  }));

  useEffect(() => {
    setSearchAnimation({
      opacity: scrolling ? 1 : 0,
      transform: `translateY(${scrolling ? 0 : -20}px)`,
    });
  }, [scrolling]);

  return (
    <>
      <animated.nav className="navbar" style={bgColorSpring}>
        <div className="logo-container">
          <Link to="/">
            <img src={AgroLogo} alt="AgroSync Logo" className="logo-image" />
          </Link>
        </div>

        <div className="search-container">
          <animated.input
            type="text"
            placeholder="What are you looking for today?"
            className="search-input"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            style={{
              ...searchAnimation,
              visibility: scrolling ? 'visible' : 'hidden',
            }}
          />
          <animated.button
            className="search-button"
            onClick={handleSearch}
            style={{
              ...searchAnimation,
              visibility: scrolling ? 'visible' : 'hidden',
            }}
          >
            <IoSearchOutline className="search-icon" />
          </animated.button>
        </div>
        <ul className="nav-list">
          {!currentUser?.isSeller && (
            <Link to="/register">
              <li className="nav-item">
                Become a Seller
              </li>
            </Link>
          )}

          {!currentUser && <Link to='/login'> <li className="nav-itemm">Sign in </li></Link>}
          {!currentUser && <Link to='/register'> <li >
            <button className="join-button">Join</button>
          </li></Link>}
          {currentUser?.isSeller && <Link to='/orders'> <li className="nav-item">Orders </li> </Link>}
          
          <div className="profile-container">
            {currentUser && <li
              className="nav-item"
              title="Profile"
            >
              <div className="profile-container">
                <img
                  onClick={() => setOpen(!Open)}
                  src={currentUser.img || commonImageUrl}
                  alt="Profile"
                  className="profile-image"
                />
                <span className="profile-username">{currentUser?.username}</span>
              </div>
              {Open && <div className="dropdown-menu">
                {currentUser?.isSeller && (
                  <>
                    <Link onClick={() => setOpen(!Open)} to="/myposts"> <span className="dropdown-item">Posts</span></Link>
                    <Link onClick={() => setOpen(!Open)} to="/addpost"> <span className="dropdown-item">Add New Item</span></Link>
                  </>
                )}
                <Link onClick={() => setOpen(!Open)} to="/orders"> <span className="dropdown-item">My Orders</span> </Link>
                <Link onClick={handleLogout}> <span className="dropdown-item">logout</span> </Link>
              </div>}
            </li>}
          </div>
        </ul>
      </animated.nav>

      <style>
        {`
          .navbar {
            width: 100%;
            position: fixed;
            padding: 0.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 20;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .logo-container {
            flex: 1;
            display: flex;
            align-items: center;
          }
          
          .logo-image {
            height: 70px; /* Increased logo size */
            width: auto;
            object-fit: contain;
            margin-top:-12px;
          }
          
          .search-container {
            flex: 2;
            display: flex;
            justify-content: center;
            margin: 0 12rem;
          }
          
          .search-input {
            width: 100%;
            max-width: 500px;
            padding: 0.625rem 1.25rem;
            border: 1px solid #d1d5db;
            border-radius: 4px 0 0 4px;
          }
          
          .search-button {
            background-color: #111827;
            padding: 0.625rem 1.25rem;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .nav-list {
            flex: 1;
            display: flex;
            list-style: none;
            gap: 1.5rem;
            align-items: center;
            justify-content: flex-end;
            padding: 0;
            margin: 0;
            margin-right:12px;
          }
          
          .nav-item, .nav-itemm {
            cursor: pointer;
            color:rgb(0, 0, 0);
            font-weight: 500;
            white-space: nowrap;
            font-size:20px;
            margin-right:12px;
          }
          
          .nav-item:hover, .nav-itemm:hover {
            color: #1DBF73;
          }
          
          .join-button {
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            padding: 0.375rem 1.25rem;
            color: #22c55e;
            background: white;
            cursor: pointer;
          }
          
          .join-button:hover {
            border-color: #15803d;
            background-color: #16a34a;
            color: white;
          }
          
          .profile-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
          }
          
          .profile-image {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid #9ca3af;
            cursor: pointer;
            object-fit: cover;
          }
          
          .profile-username {
            font-weight: 500;
            color: #374151;
            white-space: nowrap;
          }
          
          .profile-username:hover {
            color: #16a34a;
          }
          
          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            min-width: 160px;
            background-color: white;
            margin-top: 0.5rem;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            color: #374151;
            cursor: pointer;
            font-weight: 500;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 30;
          }
          
          .dropdown-item {
            padding: 0.25rem 0;
          }
          
          .dropdown-item:hover {
            color: #1DBF73;
          }
          
          .search-icon {
            height: 1.2rem;
            width: 1.2rem;
          }
          
          @media (max-width: 768px) {
            .navbar {
              padding: 0.5rem 1rem;
              flex-wrap: wrap;
            }
            
            .logo-container {
              order: 1;
              flex: none;
              width: 100px;
            }
            
            .search-container {
              order: 3;
              flex: 1 0 100%;
              margin: 0.5rem 0;
            }
            
            .nav-list {
              order: 2;
              flex: none;
              gap: 1rem;
            }
            
            .profile-username {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}

export default Navbar;