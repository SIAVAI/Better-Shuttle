/* eslint-disable react/no-unescaped-entities */
import l1 from "../../assets/carLogo/audi-logo.png";
import l2 from "../../assets/carLogo/bentley-logo.png";
import l3 from "../../assets/carLogo/bmw-logo.png";
import l4 from "../../assets/carLogo/bugatti-logo.png";
import l5 from "../../assets/carLogo/ford-logo.png";
import l6 from "../../assets/carLogo/honda-logo.png";
import l7 from "../../assets/carLogo/hyundai-logo.png";
import l8 from "../../assets/carLogo/jaguar-logo.png";
import l9 from "../../assets/carLogo/lamborghini-logo.png";
import l10 from "../../assets/carLogo/nissan-logo.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const CarLogo = () => {
  const carLogos = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10];

  return (
    <div className="my-20">
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {carLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-full shadow-lg p-4 transition-transform duration-500 hover:scale-110">
              <img
                src={logo}
                alt={`Car logo ${index + 1}`}
                className="w-24 h-24 object-contain mx-auto "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarLogo;
