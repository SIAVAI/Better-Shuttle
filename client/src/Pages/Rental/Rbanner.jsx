import { Link } from "react-router-dom";
import rb1 from "../../assets/rental/rb1.jpg";
const Rbanner = () => {
  return (
    <div className="container mx-auto">
      <div
        className="relative min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${rb1})` }}
      >
        {/* Overlay */}
        <div className="absolute  inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>

        {/* Content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Drive Your Dream Car
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Explore our premium car rentals at unbeatable prices. Reliable,
            stylish, and ready for any journey.
          </p>
          <div className="space-x-4">
            <Link
              to="/show-all-rent-car"
              className="px-6 py-3 text-lg font-medium bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-all"
            >
              Explore Cars
            </Link>
            <Link
              to="/show-all-rent-car"
              className="px-6 py-3 text-lg font-medium bg-transparent border border-white hover:bg-white hover:text-black rounded-lg transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rbanner;
