import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Featured = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/rental/car");
        if (!response.ok) {
          throw new Error("Failed to fetch featured cars");
        }
        const data = await response.json();
        setFeaturedCars(data);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      }
    };
    fetchFeaturedCars();
  }, []);

  //console.log(featuredCars);

  return (
    <div className="container mx-auto my-10">
      <div className="relative bg-fixed bg-center bg-cover bg-gray-900">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative py-16 px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
            Featured Cars
          </h2>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div
                key={car.rental_id}
                className="group bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition-all"
              >
                {/* Car Image */}
                <div className="h-48 bg-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Car Info */}
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-lg text-gray-300">${car.daily_rate}/day</p>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => navigate(`/rental/${car.rental_id}`)}
                      className="px-4 py-2 bg-transparent border border-white hover:bg-white hover:text-black rounded-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More Button */}
          <div className="mt-10">
            <Link
              to="/show-all-rent-car"
              onClick={() => navigate("/rental/all")}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
