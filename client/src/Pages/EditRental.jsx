import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditRental = () => {
  const { id: rentalId } = useParams();

  const [rentalData, setRentalData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/rental/car/${rentalId}`)
      .then((response) => {
        setRentalData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rental data:", error);
        toast.error("Failed to fetch rental details.");
        setLoading(false);
      });
  }, [rentalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rentalData = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      year: e.target.year.value,
      daily_rate: e.target.daily_rate.value,
      weekly_rate: e.target.weekly_rate.value,
      monthly_rate: e.target.monthly_rate.value,
      is_available: e.target.is_available.value,
    };
    setRentalData({ ...rentalData, rentalData });

    axios
      .put(`http://localhost:5000/rental/edit/${rentalId}`, rentalData)
      .then(() => {
        toast.success("Rental details updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating rental details:", error);
        toast.error("Failed to update rental details.");
      });
  };

  if (loading) {
    return <div className="text-center text-yellow-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-600 p-8 rounded-lg w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Edit Rental Information
        </h2>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-white">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            defaultValue={rentalData.brand || ""}
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
            defaultValue={rentalData.model || ""}
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
            defaultValue={rentalData.year || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="daily_rate" className="block text-white">
            Daily Rate
          </label>
          <input
            type="number"
            id="daily_rate"
            name="daily_rate"
            defaultValue={rentalData.daily_rate || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="weekly_rate" className="block text-white">
            Weekly Rate
          </label>
          <input
            type="number"
            id="weekly_rate"
            name="weekly_rate"
            defaultValue={rentalData.weekly_rate || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="monthly_rate" className="block text-white">
            Monthly Rate
          </label>
          <input
            type="number"
            id="monthly_rate"
            name="monthly_rate"
            defaultValue={rentalData.monthly_rate || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="is_available" className="block text-white">
            Availability
          </label>
          <select
            id="is_available"
            name="is_available"
            defaultValue={rentalData.is_available || ""}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="">Select Availability</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-white hover:bg-yellow-700 text-black p-2 rounded"
        >
          Update Rental
        </button>
      </form>
    </div>
  );
};

export default EditRental;
