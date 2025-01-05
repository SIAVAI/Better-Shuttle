import { FaShieldAlt, FaWrench, FaThumbsUp } from "react-icons/fa"; // Icons from react-icons

const Why = () => {
  return (
    <div className="bg-gray-900 text-white py-16 my-10">
      {/* Container */}
      <div className="container mx-auto px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          Why <span className="text-red-500">Choose Us</span>
        </h2>
        <p className="text-lg text-center mb-12">
          At Better Shuttle, we provide unparalleled service with a commitment
          to excellence. Here’s why thousands of customers trust us.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-500 p-4 rounded-full text-white">
              <FaShieldAlt size={40} />
            </div>
            <h3 className="text-2xl font-semibold mt-4">
              Trusted by Thousands
            </h3>
            <p className="text-gray-400 mt-2">
              We’ve built trust through years of reliable service and dedication
              to customer satisfaction.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-500 p-4 rounded-full text-white">
              <FaWrench size={40} />
            </div>
            <h3 className="text-2xl font-semibold mt-4">Expert Technicians</h3>
            <p className="text-gray-400 mt-2">
              Our team of certified experts ensures top-notch service for all
              your automotive needs.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-500 p-4 rounded-full text-white">
              <FaThumbsUp size={40} />
            </div>
            <h3 className="text-2xl font-semibold mt-4">Affordable Pricing</h3>
            <p className="text-gray-400 mt-2">
              We offer competitive pricing without compromising on quality or
              service excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
