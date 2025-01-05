import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const SingleRentCar = () => {
  const loaderData = useLoaderData();
  const [car, setCar] = useState(null);
  const { user } = useContext(AuthContext);
  const [theUser, setTheUser] = useState({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loaderData) {
      setCar(loaderData);
      setLoading(false);
    }
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
  }, [loaderData, user]);
  const userId = theUser?.user_id;

  const handleRent = async () => {
    if (!user) {
      toast.error("You need to log in to rent a car.");
      navigate("/login");
      return;
    }

    try {
      toast.loading("Processing your booking...");
      const response = await axios.put(
        `http://localhost:5000/rental/purchase/${car.rental_id}`,
        {
          userId,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Booking successful!");
        navigate(`/user/${user.email}`);
      } else {
        toast.dismiss();
        toast.error("Failed to book the car. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error during booking:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold text-red-500">
          Car not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Image */}
        <div>
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Car Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-xl text-gray-500 mt-2">Year: {car.year}</p>
            <p className="text-lg text-gray-600 mt-4">
              <strong>Daily Rate:</strong> ${car.daily_rate}/day
            </p>
            <p className="text-lg text-gray-600">
              <strong>Weekly Rate:</strong> ${car.weekly_rate}/week
            </p>
            <p className="text-lg text-gray-600">
              <strong>Monthly Rate:</strong> ${car.monthly_rate}/month
            </p>
            <p
              className={`mt-4 text-lg font-semibold ${
                car.is_available === "Yes" ? "text-green-500" : "text-red-500"
              }`}
            >
              {car.is_available === "Yes"
                ? "Available for Booking"
                : "Not Available"}
            </p>
          </div>

          {/* Booking Button */}
          <div className="mt-10">
            {car.is_available === "Yes" ? (
              <button
                onClick={handleRent}
                className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-white hover:text-black"
              >
                Proceed to Booking
              </button>
            ) : (
              <button
                disabled
                className="w-full px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
              >
                Not Available
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRentCar;
