import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/showroom/cars");
        setCars(response.data);
      } catch (error) {
        toast.error("Failed to fetch cars");
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  console.log(cars);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const newCar = {
      car_id: cars.length + 1,
      brand: form.brand.value,
      model: form.model.value,
      year: form.year.value,
      price: form.price.value,
      engine_type: form.engine_type.value,
      transmission_type: form.transmission_type.value,
      mileage: form.mileage.value,
      description: form.description.value,
      status: form.status.value,
      recondition: form.recondition.value,
      sit_number: form.sit_number.value,
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
      newCar.image = imageResponse.data.data.display_url;
      await axios.post("http://localhost:5000/showroom/add", newCar);
      toast.success("Car added successfully!");
      setCars((prevCars) => [...prevCars, newCar]);
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">
        Add Cars to Showroom
      </h1>

      {/* Add Car Form */}
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
            label: "Price",
            name: "price",
            type: "number",
            placeholder: "e.g., 50000",
          },
          {
            label: "Engine Type",
            name: "engine_type",
            type: "text",
            placeholder: "e.g., Hybrid",
          },
          {
            label: "Mileage",
            name: "mileage",
            type: "number",
            placeholder: "e.g., 10000",
          },
          {
            label: "Sit Number",
            name: "sit_number",
            type: "number",
            placeholder: "e.g., 4",
          },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              required
              placeholder={field.placeholder}
              className="input-field w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
        ))}

        {/* Dropdown Inputs */}
        <div>
          <label className="block text-sm font-semibold text-red-500 mb-2">
            Transmission Type:
          </label>
          <select
            name="transmission_type"
            required
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          >
            {["Manual", "Automatic", "CVT", "DCT", "AMT"].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-500 mb-2">
            Status:
          </label>
          <select
            name="status"
            required
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          >
            {["Available", "Sold"].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-500 mb-2">
            Recondition:
          </label>
          <select
            name="recondition"
            required
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          >
            {["Yes", "No"].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-red-500 mb-2">
            Description:
          </label>
          <textarea
            name="description"
            required
            className="w-full h-24 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
            placeholder="Write a brief description..."
          ></textarea>
        </div>

        {/* Image Input */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-red-500 mb-2">
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
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-red-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 mt-3 border-2 border-red-500 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 transition duration-300"
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
