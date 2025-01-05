import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import AllData from "./AllData";
import Statistics from "./Statistics";

const Profile = () => {
  const data = useLoaderData();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [data]);
  let purchasedCars = 0;
  let purchasedServices = 0;
  let rentedCars = 0;

  if (user && typeof user === "object") {
    if (typeof user.purchased_car_ids === "string") {
      purchasedCars = user.purchased_car_ids.split(" ").filter(Boolean).length;
    }
    if (typeof user.purchased_service_ids === "string") {
      purchasedServices = user.purchased_service_ids
        .split(" ")
        .filter(Boolean).length;
    }
    if (typeof user.rented_car_ids === "string") {
      rentedCars = user.rented_car_ids.split(" ").filter(Boolean).length;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-xl font-semibold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-12 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* User Role Section */}
        <motion.div
          className={`text-center font-bold ${
            user.is_admin ? "text-black" : "text-blue-600"
          } font-semibold text-xl`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {user.is_admin ? "Admin Profile" : "Guest Profile"}
        </motion.div>

        {/* User Details */}
        <div className="flex flex-col items-center mt-6 space-y-4">
          {user.is_admin ? (
            <FaUserSecret className="text-6xl text-black" />
          ) : (
            <FaUserTie className="text-6xl text-blue-600" />
          )}
          <motion.div
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.name}
          </motion.div>
          <motion.div
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {user.email}
          </motion.div>
          <motion.div
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Purchased Cars:{" "}
            <span className="text-black font-semibold">
              {purchasedCars || "None"}
            </span>
          </motion.div>
          <motion.div
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Rented Cars: {rentedCars || "None"}
          </motion.div>
          <motion.div
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Purchased Services: {purchasedServices || "None"}
          </motion.div>
        </div>
      </div>
      {user.is_admin && <AllData />}
      {user.is_admin && <Statistics></Statistics>}
    </motion.div>
  );
};

export default Profile;
