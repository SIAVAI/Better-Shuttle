import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [stats, setStats] = useState({
    soldCars: 0,
    rentedCars: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [carsResponse, rentalsResponse] = await Promise.all([
          axios.get("http://localhost:5000/showroom/sold"), // Sold cars count
          axios.get("http://localhost:5000/rental/rented"), // Rented cars count
        ]);

        setStats({
          soldCars: carsResponse.data.count,
          rentedCars: rentalsResponse.data.count,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-600 text-lg">Loading statistics...</p>
      </div>
    );
  }

  const total = stats.soldCars + stats.rentedCars || 1;

  // Data for Pie Chart
  const chartData = {
    labels: ["Sold Cars", "Rented Cars"],
    datasets: [
      {
        label: "Statistics",
        data: [stats.soldCars, stats.rentedCars],
        backgroundColor: ["#ef4444", "#f97316"], // Red and Orange
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-6 bg-black text-white mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">STATISTICS</h2>

      {/* Pie Chart */}
      <div className="mb-8">
        <Pie data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sold Cars */}
        <motion.div
          className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-xl font-semibold">Sold Cars</p>
          <p className="text-4xl font-bold mt-2">{stats.soldCars}</p>
          <p className="text-sm mt-1">
            {((stats.soldCars / total) * 100).toFixed(2)}% of total
          </p>
        </motion.div>

        {/* Rented Cars */}
        <motion.div
          className="bg-orange-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-xl font-semibold">Rented Cars</p>
          <p className="text-4xl font-bold mt-2">{stats.rentedCars}</p>
          <p className="text-sm mt-1">
            {((stats.rentedCars / total) * 100).toFixed(2)}% of total
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;
