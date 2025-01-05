import bg from "../../assets/home.mp4";
import { Typewriter } from "react-simple-typewriter";

const HomeBanner = () => {
  return (
    <div className="relative h-screen w-full text-white mb-6">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bg}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay for Darkening */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Your Journey Starts Here: <br />
          <span
            className="mt-4 pt-4 text-3xl"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={["Cars", "Services", "Rentals", "And Many More!"]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Discover a world-class showroom, car services, <br />
          and hassle-free rentals under one roof.
        </p>
        <button className="px-6 py-3 bg-inherit text-white font-semibold rounded-lg">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
