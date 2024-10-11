import React from 'react';
import { Link } from 'react-router-dom';
import { FaWeight, FaBook, FaVirus } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">HealthCalc</div> {/* Brand Name */}
        <ul className="flex space-x-4">
          <li>
            <Link className="flex items-center text-white hover:text-blue-200" to="/poidsIdeal">
              <FaWeight className="mr-1" /> {/* Weight Icon */}
              PoidsIdeal
            </Link>
          </li>
          <li>
            <Link className="flex items-center text-white hover:text-blue-200" to="/books">
              <FaBook className="mr-1" /> {/* Books Icon */}
              BooksStore
            </Link>
          </li>
          <li>
            <Link className="flex items-center text-white hover:text-blue-200" to="/covid">
              <FaVirus className="mr-1" /> {/* Covid Icon */}
              Covid
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
