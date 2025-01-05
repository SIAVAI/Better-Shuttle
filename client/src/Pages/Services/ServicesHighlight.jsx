import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServicesHighlight = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  //console.log(services);

  return (
    <div className="container mx-auto py-16">
      {/* Header */}
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.service_id}
            className="group bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
          >
            {/* Service Image */}
            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Service Info */}
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">{service.service_name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <p className="text-gray-700 font-medium mt-4">
                Price: ${service.price}
              </p>
              <p className="text-gray-500">
                Estimated Duration: {service.estimated_duration}{" "}
                {service.service_duration_type}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  service.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {service.status === "active" ? "Active" : "Inactive"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              {service.status === "active" ? (
                <Link to={`/service-details/${service.service_id}`}>
                  <button className="w-full px-4 py-2 bg-[#ff3811] text-white rounded-lg hover:bg-[#ff3911b2]">
                    Book Now
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesHighlight;
