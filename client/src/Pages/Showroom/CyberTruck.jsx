import cb from "../../assets/cyber.jpg";

const CyberTruck = () => {
  return (
    <div className="relative bg-gradient-to-b from-black to-gray-900 text-white py-16">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Image Section */}
          <div className="flex-1 w-[60%]">
            <img
              src={cb}
              alt="Tesla Cybertruck"
              className="w-[60%] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              The <span className="text-[#a22c29]">Future</span> of Automotive
              Design
            </h2>
            <p className="text-lg text-[#d6d5c9] mb-8">
              Experience the groundbreaking Tesla Cyber Truck—a symbol of
              innovation, resilience, and performance. Its unique design and
              advanced technology redefine the possibilities of automotive
              engineering.
            </p>

            {/* Features List */}
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-4 h-4 bg-[#a22c29] rounded-full mr-3"></span>
                <p>Ultra-Hard 30X Cold-Rolled Stainless Steel Exoskeleton</p>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-[#a22c29] rounded-full mr-3"></span>
                <p>Bulletproof Glass for Unmatched Durability</p>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-[#a22c29] rounded-full mr-3"></span>
                <p>Tri-Motor AWD with 500+ Miles Range</p>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-[#a22c29] rounded-full mr-3"></span>
                <p>Zero to 60 MPH in Just 2.9 Seconds</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberTruck;
