import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditService = () => {
  const { id: serviceId } = useParams();
  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/${serviceId}`)
      .then((response) => {
        setServiceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
        toast.error("Failed to fetch service details.");
        setLoading(false);
      });
  }, [serviceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      service_name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      estimated_duration: e.target.duration.value,
    };
    setServiceData({ ...serviceData, serviceData });

    axios
      .put(`http://localhost:5000/services/edit/${serviceId}`, serviceData)
      .then(() => {
        toast.success("Service details updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating service details:", error);
        toast.error("Failed to update service details.");
      });
  };

  if (loading) {
    return <div className="text-center text-orange-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-orange-900 p-8 rounded-lg w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Edit Service Information
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-white">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={serviceData.service_name || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-white">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={serviceData.description || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-white">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={serviceData.price || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-white">
            Duration (in hours)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            defaultValue={serviceData.estimated_duration || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white p-2 rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
