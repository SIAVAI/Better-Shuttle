import CountUp from "react-countup";

const AboutUsSection = () => {
  return (
    <div className="relative bg-gray-100 py-16 text-gray-800 ">
      {/* Section Container */}
      <div className="container mx-auto px-8 lg:px-16">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          About <span className="text-[#1E1E1E]">Better Shuttle</span>
        </h2>
        {/* Description */}
        <p className="text-lg text-center mb-12">
          At Better Shuttle, we specialize in bringing you the best in car
          sales, reliable services, and affordable rentals. We are dedicated to
          making your journey smooth, stylish, and stress-free.
        </p>
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-[#1E1E1E]">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-bold">
              <CountUp end={150} duration={15} suffix="+" />
            </h3>
            <p className="text-lg mt-2">Cars Available</p>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-center text-[#1E1E1E]">
            <h3 className="text-5xl font-bold ">
              <CountUp end={50} duration={15} suffix="+" />
            </h3>
            <p className="text-lg mt-2">Services Offered</p>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col items-center text-[#1E1E1E]">
            <h3 className="text-5xl font-bold">
              <CountUp end={20000} duration={15} separator="," suffix="+" />
            </h3>
            <p className="text-lg mt-2">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
