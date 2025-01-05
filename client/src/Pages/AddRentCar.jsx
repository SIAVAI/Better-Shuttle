import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddRentCar = () => {
  const [rentalCars, setRentalCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchRentalCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rental/cars");
        setRentalCars(response.data);
      } catch (error) {
        toast.error("Failed to fetch rental cars");
        console.error("Error fetching rental cars:", error);
      }
    };
    fetchRentalCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const newRentalCar = {
      rental_id: rentalCars.length + 1,
      brand: form.brand.value,
      model: form.model.value,
      year: form.year.value,
      daily_rate: form.daily_rate.value,
      weekly_rate: form.weekly_rate.value,
      monthly_rate: form.monthly_rate.value,
      is_available: form.is_available.value,
    };

    const image = form.image.files[0];

    try {
      // IMGBB
      const formData = new FormData();
      formData.append("image", image);
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      newRentalCar.image = imageResponse.data.data.display_url;
      await axios.post("http://localhost:5000/rental/add", newRentalCar);
      toast.success("Rental car added successfully!");
      setRentalCars((prevCars) => [...prevCars, newRentalCar]);
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding rental car:", error);
      toast.error("Failed to add rental car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">
        Add Rental Cars
      </h1>

      {/* Add Rental Car Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black shadow-lg rounded-lg p-8 text-white"
      >
        {/* Form Inputs */}
        {[
          {
            label: "Brand",
            name: "brand",
            type: "text",
            placeholder: "e.g., Toyota",
          },
          {
            label: "Model",
            name: "model",
            type: "text",
            placeholder: "e.g., Corolla",
          },
          {
            label: "Year",
            name: "year",
            type: "number",
            placeholder: "e.g., 2023",
          },
          {
            label: "Daily Rate ($)",
            name: "daily_rate",
            type: "number",
            placeholder: "e.g., 50",
          },
          {
            label: "Weekly Rate ($)",
            name: "weekly_rate",
            type: "number",
            placeholder: "e.g., 300",
          },
          {
            label: "Monthly Rate ($)",
            name: "monthly_rate",
            type: "number",
            placeholder: "e.g., 1200",
          },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-semibold text-yellow-500 mb-2">
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              required
              placeholder={field.placeholder}
              className="input-field w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>
        ))}

        {/* Availability Select */}
        <div>
          <label className="block text-sm font-semibold text-yellow-500 mb-2">
            Availability:
          </label>
          <select
            name="is_available"
            required
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          >
            {["Yes", "No"].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Image Input */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-yellow-500 mb-2">
            Image:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files[0]))
            }
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-yellow-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 mt-3 border-2 border-yellow-500 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300"
          >
            {loading ? "Adding..." : "Add Rental Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRentCar;
