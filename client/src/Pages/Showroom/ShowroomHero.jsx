import { Link } from "react-router-dom";
import video from "../../assets/showroom/showroom.mp4";

const ShowroomHero = () => {
  return (
    <div className="shadow-md">
      <div className="relative h-screen w-full text-white">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        ></video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore Your <span className="text-red-500">Dream Car</span> Today!
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Discover a wide range of premium cars tailored to your style and
            needs.
          </p>
          <Link
            to="/show-all-cars"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowroomHero;
