import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { Link, useNavigate } from "react-router-dom";
const commonImageUrl = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";
import newRequest from "../../utils/newRequest";

function NavMenu() {
  const [isDivVisible, setDivVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [bgColorScrolling, setBgColorScrolling] = useState(false);
  const { currentUser, logout } = useAuth();
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleButtonClick = () => {
    // Toggle the visibility of the div
    setDivVisible(!isDivVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled >= 140) {
        setScrolling(true);
      } else if (scrolled >= 0) {
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
  }, []);

  const bgColorSpring = useSpring({
    backgroundColor: bgColorScrolling ? 'white' : 'rgba(22, 163,74, 0.8)',
    backdropFilter: bgColorScrolling ? 'none' : 'blur(10px)',
  });
  
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      // setOpen(false);
      toast.success("user logged out successfully");
      logout();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <div className="fixed mt-3 z-40  sm:hidden ">
        <button
          onClick={handleButtonClick}
          className="dark-icon ml-8 mr-24 "
        >
          <FontAwesomeIcon size="xl" icon={faBars} />
        </button>
        <animated.div style={bgColorSpring} className={`${isDivVisible ? "nav2" : "hidden"}`}>
            <div className="">
        <ul className="sm:ml-8 ml-2 w-full py-8 items-center">
        {!currentUser && <Link to='/login'> <li className="cursor-pointer pb-6  text-gray-600 hover:text-[#1DBF73] font-medium">Sign in </li></Link>}
        {!currentUser && <Link to='/register'> <li className="cursor-pointer font-medium" onClick={() => {}}>
          <button className="border hover:border-green-700 rounded-md hover:bg-green-600 px-5 py-1.5 text-green-500 hover:text-white">Join</button>
        </li></Link>}
        <li
          className="cursor-pointer "
          onClick={() => setIsContextMenuVisible(true)}
          title="Profile"
        >
        </li>
        {currentUser && <li
          className="cursor-pointer "
          title="Profile"
        >
          <div className="flex flex-wrap items-center gap-2">
          <img
            onClick={() => setOpen(!Open)}
            src={currentUser.img || commonImageUrl}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-400 cursor-pointer"
          />
          <span className="font-medium text-xl text-gray-700  hover:text-green-600">{currentUser?.username}</span>
          </div>
          <div className="absolute  w-32 mt-3 flex flex-col p-4 gap-1.5 text-gray-700  cursor-pointe font-medium rounded-md">
            {currentUser?.isSeller && (
              <>
             <Link onClick={() => setOpen(!Open)} to="/myposts"> <span className="hover:text-[#1DBF73]">Post</span></Link>
             <Link onClick={() => setOpen(!Open)} to="/addpost"> <span className="hover:text-[#1DBF73]">Add New</span></Link>
              </>
              )}
              <Link onClick={() => setOpen(!Open)} to="/orders"> <span className="hover:text-[#1DBF73]">Orders</span> </Link>
              <Link  onClick={handleLogout}> <span className="hover:text-[#1DBF73]">logout</span> </Link>
          </div>
          </li>}
      </ul>
      </div>
        </animated.div>
      </div>
    </div>
  )
}

export default NavMenu;