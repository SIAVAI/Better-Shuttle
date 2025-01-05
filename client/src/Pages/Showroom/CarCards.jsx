import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CarCards = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/showroom/cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-100 text-gray-800 my-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Explore Our <span className="text-red-500">Showroom</span>
        </h2>
        <p className="text-lg text-gray-600">
          Discover a selection of our finest cars tailored to your needs.
        </p>
      </div>

      {/* Car Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.slice(0, 8).map((car) => (
          <div
            key={car.car_id}
            className="card card-compact bg-base-100 w-96 shadow-xl relative group"
          >
            <figure>
              <img
                src={car.image}
                alt={car.brand + " " + car.model}
                className="h-48 object-cover w-full"
              />
              {/* Hover overlay for sold cars */}
              {car.status === "Sold" && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Not Available / Sold
                </div>
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.brand + " " + car.model}</h2>
              <p className="text-gray-600 text-sm">
                {car.description.length > 100
                  ? car.description.slice(0, 100) + "..."
                  : car.description}
              </p>
              <p className="font-semibold">
                Price: ${car.price.toLocaleString()}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={
                    car.status === "Sold" ? "#" : `/car-details/${car.car_id}`
                  }
                  className={`btn ${
                    car.status === "Sold" ? "btn-disabled" : "bg-[#ef4444]"
                  }`}
                  disabled={car.status === "Sold"}
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-12">
        <Link to="/show-all-cars">
          <button className="btn btn-outline bg-[#ef4444] px-8 py-3">
            See More Cars
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCards;
