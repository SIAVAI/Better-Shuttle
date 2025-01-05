import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theUser, setTheUser] = useState({});
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:5000/user").then((res) => {
        const currentUser = res.data.find((u) => u.email === user.email);
        setTheUser(currentUser || {});
      });
    }
  }, [user]);

  const handleAvatarClick = () => {
    setIsAvatarMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
    setIsAvatarMenuOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="navbar shadow-md bg-black text-white sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-red-600">
          <motion.span
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Better Shuttle
          </motion.span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden p-2 text-red-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <motion.ul
          className="hidden lg:flex space-x-6"
          initial="hidden"
          animate="visible"
        >
          {[
            { name: "Home", to: "/" },
            { name: "Showroom", to: "/showroom" },
            { name: "Services", to: "/service" },
            { name: "Rentals", to: "/rental" },
            ...(user ? [] : [{ name: "Login", to: "/login" }]),
          ].map((link, index) => (
            <motion.li key={link.name} custom={index} variants={linkVariants}>
              <Link
                to={link.to}
                className="hover:text-red-600 transition duration-200"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* User Dropdown */}
        {user && (
          <div className="relative">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAvatarClick}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <RxAvatar className="w-10 h-10 rounded-full" />
              )}
            </motion.div>
            {isAvatarMenuOpen && (
              <motion.ul
                className="absolute right-0 bg-white text-black shadow-lg rounded-md py-2 mt-2 w-64 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  ...(theUser.is_admin
                    ? [
                        { name: "Add Car (Showroom)", to: "/add-car" },
                        { name: "Add Service", to: "/add-service" },
                        { name: "Add Car (Rental)", to: "/add-rent-car" },
                      ]
                    : []),
                  { name: "Show All Cars (Showroom)", to: "/show-all-cars" },
                  { name: "Show All Cars (Rental)", to: "/show-all-rent-car" },
                  { name: "Profile", to: `/user/${user.email}` },
                ].map((route) => (
                  <li key={route.name}>
                    <Link
                      to={route.to}
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsAvatarMenuOpen(false)}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </motion.ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          className="lg:hidden bg-black text-white flex flex-col items-center space-y-4 py-4"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
        >
          {[
            { name: "Home", to: "/" },
            { name: "Showroom", to: "/showroom" },
            { name: "Services", to: "/service" },
            { name: "Rentals", to: "/rental" },
            ...(user ? [] : [{ name: "Login", to: "/login" }]),
          ].map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="hover:text-red-600 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
};

export default Navbar;
