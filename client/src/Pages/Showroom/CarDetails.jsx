import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const CarDetails = () => {
  const car = useLoaderData();
  const navigate = useNavigate();
  const carId = car?.car_id;
  const { user } = useContext(AuthContext);
  const [theUser, setTheUser] = useState({});

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/user")
        .then((res) => {
          const currentUser = res.data.find((u) => u.email === user.email);
          setTheUser(currentUser || {});
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          toast.error("Failed to load user information.");
        });
    }
  }, [user]);

  const userId = theUser?.user_id;

  const handlePurchase = async () => {
    if (!user) {
      toast.error("You need to log in to make a purchase.");
      navigate("/login");
      return;
    }

    try {
      toast.loading("Processing your purchase...");
      const response = await axios.put(
        `http://localhost:5000/showroom/purchase/${carId}`,
        {
          userId,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Purchase successful!");
        navigate("/showroom");
      } else {
        toast.dismiss();
        toast.error("Failed to purchase the car. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error during purchase:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (!car) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-2xl font-semibold text-red-500">Car not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-500">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full lg:w-1/2 object-cover h-96"
          />
          <div className="p-8 flex-1">
            <h2 className="text-3xl font-bold mb-4">
              {car.brand} {car.model}
            </h2>
            <p className="text-gray-600 mb-6">{car.description}</p>
            <div className="grid grid-cols-2 gap-4 text-lg font-medium">
              <p>
                <span className="font-bold">Price:</span> $
                {car.price.toLocaleString()}
              </p>
              <p>
                <span className="font-bold">Year:</span> {car.year}
              </p>
              <p>
                <span className="font-bold">Engine:</span> {car.engine_type}
              </p>
              <p>
                <span className="font-bold">Mileage:</span> {car.mileage} km
              </p>
              <p>
                <span className="font-bold">Transmission:</span>{" "}
                {car.transmission_type}
              </p>
              <p>
                <span className="font-bold">Seats:</span> {car.sit_number}
              </p>
              <p>
                <span className="font-bold">Recondition:</span>{" "}
                {car.recondition ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-bold">Status:</span> {car.status}
              </p>
            </div>
            <div className="mt-8">
              <button
                onClick={handlePurchase}
                className={`btn bg-[#ef4444] w-full py-3 text-lg ${
                  car.status !== "Available"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={car.status !== "Available"}
              >
                {car.status === "Available"
                  ? "Confirm Purchase"
                  : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
