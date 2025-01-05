import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const SingleService = () => {
  const service = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [theUser, setTheUser] = useState({});
  const [loading, setLoading] = useState(true);

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
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const serviceId = service?.service_id;
  const userId = theUser?.user_id;

  const handleBookService = async () => {
    if (!user) {
      toast.error("You need to log in to book a service.");
      navigate("/login");
      return;
    }

    try {
      toast.loading("Processing your booking...");
      const response = await axios.put(
        `http://localhost:5000/service/purchase/${serviceId}`,
        { userId }
      );

      toast.dismiss();
      if (response.status === 200) {
        toast.success("Booking successful!");
        navigate(`/user/${user.email}`);
      } else {
        toast.error("Failed to book the service. Please try again.");
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-500"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-red-500"
        >
          Service not found.
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white text-gray-800 flex items-center justify-center py-12 px-4"
    >
      <div className="max-w-4xl w-full bg-orange-50 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-orange-500 text-white py-6 px-8 text-center"
        >
          <h1 className="text-3xl font-bold">{service.service_name}</h1>
        </motion.div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <img
              src={service.image || "https://via.placeholder.com/400"}
              alt={service.service_name}
              className="w-full h-60 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-gray-700 mb-4">{service.description}</p>
            <div className="text-lg mb-4">
              <p>
                <strong>Price:</strong> ${service.price.toLocaleString()}
              </p>
              <p>
                <strong>Estimated Duration:</strong>{" "}
                {service.estimated_duration} minutes
              </p>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookService}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              >
                Book Service
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleService;
