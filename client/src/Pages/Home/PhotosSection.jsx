/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import car1 from "../../assets/home_car_ign/car1.jpg";
import car2 from "../../assets/home_car_ign/car2.jpg";
import car3 from "../../assets/home_car_ign/car3.jpg";
import car4 from "../../assets/home_car_ign/car4.jpg";
import car5 from "../../assets/home_car_ign/car5.jpg";
import car6 from "../../assets/home_car_ign/car6.jpg";
import bg from "../../assets/home_car_ign/bg.jpg";

const PhotosSection = () => {
  const photos = [
    { src: car1, caption: "Dream Big" },
    { src: car2, caption: "Ignite Passion" },
    { src: car3, caption: "Chase Adventure" },
    { src: car4, caption: "Embrace the Journey" },
    { src: car5, caption: "Feel the Speed" },
    { src: car6, caption: "Live the Moment" },
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 mt-8">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Explore Our Gallery
        </h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-lg font-semibold px-4 text-center">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosSection;
