/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditShowroom = ({ carId }) => {
  const { id } = useParams();

  const [carData, setCarData] = useState({});
  const [loading, setLoading] = useState(true);

  const data = useLoaderData();
  useEffect(() => {
    setCarData(data);
    setLoading(false);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      year: e.target.year.value,
      price: e.target.price.value,
    };
    setCarData({ ...carData, carData });

    axios
      .put(`http://localhost:5000/showroom/cars/edit/${id}`, carData)
      .then((response) => {
        toast.success("Car details updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update car details.");
      });
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-red-900 p-8 rounded-lg w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Edit Car Information
        </h2>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-white">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            defaultValue={carData.brand || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-white">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            defaultValue={carData.model || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-white">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            defaultValue={carData.year || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-white">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={carData.price || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditShowroom;
