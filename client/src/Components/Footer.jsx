import logo from "./../assets/logo.jpg";
import bg from "./../assets/footer-background.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <footer className="relative bg-gradient-to-br from-gray-800 to-black text-white">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: 0.2,
          }}
        ></div>

        {/* Footer Content */}
        <div className="relative z-10 px-8 py-16 md:px-20 lg:px-32 flex flex-col md:flex-row justify-around items-center">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <div className="text-xl font-bold mb-4">
              <img src={logo} className="w-auto h-16" alt="" />
            </div>
            <div className="text-white text-sm">
              <p>
                Empowering your journey with reliable services and innovative
                solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <nav className="flex flex-col">
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="flex flex-col">
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-gray-400 transition-all duration-300 text-4xl"
            >
              <FaSquareFacebook />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all duration-300 text-4xl"
            >
              <FaSquareInstagram />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all duration-300 text-4xl"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all duration-300 text-4xl"
            >
              <IoLogoLinkedin />
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="relative z-10 border-t border-gray-600">
          <div className="container mx-auto py-4 px-8 text-center text-sm">
            © 2024. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
