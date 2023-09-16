import React from "react";
import useNavbar from "../hooks/useNavbar";

const Navbar = () => {
  const navbarHook = useNavbar()

  const handleClick = () => {
    if(navbarHook.isOpen){
      navbarHook.onClose()
    }else{
      navbarHook.onOpen()
    }
  };


  return (
    <nav className="navbar navbar-dark text-white bg-black fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand font-bold text-white text-3xl" href="#">
          LMTechub
        </a>
        <button className="navbar-toggler bg-black" onClick={handleClick}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
