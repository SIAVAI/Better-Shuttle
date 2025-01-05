import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllData = () => {
  const [showroomData, setShowroomData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [rentalData, setRentalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showroomRes, serviceRes, rentalRes] = await Promise.all([
          axios.get("http://localhost:5000/showroom/cars"),
          axios.get("http://localhost:5000/services"),
          axios.get("http://localhost:5000/rental/cars"),
        ]);
        setShowroomData(showroomRes.data);
        setServiceData(serviceRes.data);
        setRentalData(rentalRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      let url;
      if (type === "Showroom")
        url = `http://localhost:5000/showroom/delete/${id}`;
      if (type === "Service")
        url = `http://localhost:5000/services/delete/${id}`;
      if (type === "Rental") url = `http://localhost:5000/rental/delete/${id}`;

      console.log(id, type);

      await axios.delete(url);
      toast.success(`${type} entry deleted successfully!`);

      // Update UI
      if (type === "Showroom")
        setShowroomData((prev) => prev.filter((item) => item.car_id !== id));
      if (type === "Service")
        setServiceData((prev) => prev.filter((item) => item.service_id !== id));
      if (type === "Rental")
        setRentalData((prev) => prev.filter((item) => item.rental_id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete entry.");
    }
  };

  const renderTable = (data, type) => (
    <table className="w-full border-collapse border text-left">
      <thead>
        <tr className="bg-gray-100">
          {Object.keys(data[0]).map((key) => (
            <th key={key} className="border px-4 py-2">
              {key.toUpperCase()}
            </th>
          ))}
          <th className="border px-4 py-2">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.car_id || item.service_id || item.rental_id}>
            {Object.values(item).map((val, index) => (
              <td key={index} className="border px-4 py-2">
                {val}
              </td>
            ))}
            <td className="border px-4 py-2">
              {type === "Showroom" && (
                <Link
                  to={`/edit-car/${item.car_id}`}
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              )}
              {type === "Service" && (
                <Link
                  to={`/edit-service/${item.service_id}`}
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              )}
              {type === "Rental" && (
                <Link
                  to={`/edit-rental/${item.rental_id}`}
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              )}
              <button
                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                onClick={() =>
                  handleDelete(
                    item.car_id || item.service_id || item.rental_id,
                    type
                  )
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Data</h1>
      <Tabs>
        <TabList className="flex justify-center space-x-4 my-8 text-black font-semibold">
          <Tab>Showroom</Tab>
          <Tab>Service</Tab>
          <Tab>Rental</Tab>
        </TabList>

        <TabPanel className="overflow-x-auto">
          {showroomData.length > 0 ? (
            renderTable(showroomData, "Showroom")
          ) : (
            <p>No data available.</p>
          )}
        </TabPanel>

        <TabPanel className="overflow-x-auto">
          {serviceData.length > 0 ? (
            renderTable(serviceData, "Service")
          ) : (
            <p>No data available.</p>
          )}
        </TabPanel>

        <TabPanel className="overflow-x-auto">
          {rentalData.length > 0 ? (
            renderTable(rentalData, "Rental")
          ) : (
            <p>No data available.</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllData;
