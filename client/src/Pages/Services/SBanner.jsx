import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import images
import b1 from "../../assets/service/banner/1.jpg";
import b2 from "../../assets/service/banner/2.jpg";
import b3 from "../../assets/service/banner/3.jpg";
import b4 from "../../assets/service/banner/4.jpg";
import b5 from "../../assets/service/banner/5.jpg";
import b6 from "../../assets/service/banner/6.jpg";

const SBanner = () => {
  const slides = [b1, b2, b3, b4, b5, b6];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-[500px] md:h-[600px] lg:h-[800px]"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`Banner ${index + 1}`}
              />
              {/* Text Content */}
              <div className="absolute left-5 top-1/2 md:top-1/3 lg:top-1/2 transform -translate-y-1/2 text-left backdrop-blur-sm rounded-lg pt-2 px-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-md pt-6">
                  Affordable Price For Car Servicing
                </h2>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white">
                  There are many variations of passages of available, but <br />
                  the majority have suffered alteration in some form.
                </p>
                <div className="flex justify-start items-center gap-4">
                  <button className="mt-6 btn bg-transparent border border-white text-white bg-[#FF3811] hover:bg-white hover:text-[#FF3811] transition-colors duration-300">
                    Learn More
                  </button>
                  <button className="mt-6 btn bg-transparent border border-white text-white bg-[#FF3811] hover:bg-white hover:text-[#FF3811] transition-colors duration-300">
                    Know More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SBanner;
