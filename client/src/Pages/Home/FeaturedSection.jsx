import { useNavigate } from "react-router-dom";
import { FaCar, FaTools, FaCarSide } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleNavigate = (route) => {
    if (user) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  const services = [
    {
      title: "Car Showroom",
      description:
        "Explore a wide range of premium cars tailored to your style and needs.",
      icon: <FaCar size={40} />,
      route: "/showroom",
    },
    {
      title: "Car Services",
      description:
        "From parts to repairs, we keep your ride smooth and reliable.",
      icon: <FaTools size={40} />,
      route: "/service",
    },
    {
      title: "Car Rentals",
      description:
        "Affordable rentals for your everyday needs and special journeys.",
      icon: <FaCarSide size={40} />,
      route: "/rental",
    },
  ];

  return (
    <div className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          Our <span className="text-red-500">Services</span>
        </h2>
        <p className="text-lg text-center text-gray-400 mb-12">
          Discover our exceptional offerings designed to meet all your
          automotive needs.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => handleNavigate(service.route)}
            >
              {/* Icon */}
              <div className="flex justify-center items-center bg-gray-800 text-red-500 w-16 h-16 rounded-full mx-auto mt-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2 group-hover:text-gray-400">
                  {service.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-lg font-semibold">
                  Click to Learn More
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
