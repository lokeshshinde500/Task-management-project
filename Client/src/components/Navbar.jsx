import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">TODO.Com</div>
        <div className="hidden md:flex space-x-4">
          <Link to={"/home"} className="text-white hover:text-green-200">
            Tasks
          </Link>
          <Link to={"/"} className="text-white hover:text-green-200">
            Create Tasks
          </Link>
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <MdOutlineMenu />
          </button>
        </div>
      </div>
      <div
        className={`sm:hidden flex flex-col space-y-2 mt-2 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link to={"/home"} className="text-white hover:text-green-200">
          Tasks
        </Link>
        <Link to={"/"} className="text-white hover:text-green-200">
          Create Tasks
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
