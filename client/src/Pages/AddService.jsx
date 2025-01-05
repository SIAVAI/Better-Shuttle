import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
      } catch (error) {
        toast.error("Failed to fetch services");
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newService = {
      service_id: services.length + 1,
      service_name: form.service_name.value,
      description: form.description.value,
      price: form.price.value,
      estimated_duration: form.estimated_duration.value,
      category: form.category.value,
      status: form.status.value,
    };

    const image = form.image.files[0];

    try {
      //  IMGBB
      const formData = new FormData();
      formData.append("image", image);
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      newService.image = imageResponse.data.data.display_url;

      await axios.post("http://localhost:5000/services/add", newService);

      toast.success("Service added successfully!");
      setServices((prevServices) => [...prevServices, newService]);
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 animate-fade-in">
        Add Services
      </h1>

      {/* Add Service Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black shadow-lg rounded-lg p-8 text-white"
      >
        {/* Form Inputs */}
        {[
          {
            label: "Service Name",
            name: "service_name",
            type: "text",
            placeholder: "e.g., Oil Change",
          },
          {
            label: "Price ($)",
            name: "price",
            type: "number",
            placeholder: "e.g., 50",
          },
          {
            label: "Estimated Duration",
            name: "estimated_duration",
            type: "text",
            placeholder: "e.g., 30 minutes",
          },
          {
            label: "Category",
            name: "category",
            type: "text",
            placeholder: "e.g., Maintenance",
          },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-semibold text-orange-500 mb-2">
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              required
              placeholder={field.placeholder}
              className="input-field w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
            />
          </div>
        ))}

        {/* Status Select */}
        <div>
          <label className="block text-sm font-semibold text-orange-500 mb-2">
            Status:
          </label>
          <select
            name="status"
            required
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
          >
            {["Active", "Inactive"].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-orange-500 mb-2">
            Description:
          </label>
          <textarea
            name="description"
            required
            className="w-full h-24 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
            placeholder="Write a brief description..."
          ></textarea>
        </div>

        {/* Image Input */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-orange-500 mb-2">
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
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-orange-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 mt-3 border-2 border-orange-500 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-white font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 transition duration-300"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
