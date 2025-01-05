/* eslint-disable react/no-unescaped-entities */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import { FaStar } from "react-icons/fa";

import c1 from "../../assets/Customer/user1.jpg";
import c2 from "../../assets/Customer/user2.jpg";
import c3 from "../../assets/Customer/user3.jpg";
import c4 from "../../assets/Customer/user4.jpg";
import c5 from "../../assets/Customer/user5.jpg";
import c6 from "../../assets/Customer/user6.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      photo: c1,
      rating: 5,
      review: "I found the perfect car at Better Shuttle!",
    },
    {
      name: "Jane Smith",
      photo: c2,
      rating: 4,
      review: "Excellent service and friendly staff!",
    },
    {
      name: "Emily Johnson",
      photo: c3,
      rating: 5,
      review: "Great selection of cars and hassle-free rentals.",
    },
    {
      name: "David Lee",
      photo: c4,
      rating: 5,
      review: "The best car-buying experience I’ve ever had!",
    },
    {
      name: "Michael Brown",
      photo: c5,
      rating: 5,
      review: "Quick and easy process. Highly recommended!",
    },
    {
      name: "Sarah Wilson",
      photo: c6,
      rating: 4,
      review: "Affordable prices and top-notch services. Highly recommended!",
    },
  ];

  return (
    <div className="text-white py-16">
      <div className="container mx-auto px-8 lg:px-16 text-black">
        {/* Section Title */}

        <h2 className="text-4xl font-bold text-center mb-8 ">
          What Our <span className="text-red-500">Customers</span> Say
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Hear from those who’ve experienced Better Shuttle.
        </p>

        {/* Testimonials Carousel */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#1e2329] rounded-lg shadow-lg p-6 text-center">
                {/* Customer Photo */}
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Star Rating */}
                <div className="flex justify-center mb-4 text-yellow-500">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                {/* Review */}
                <p className="text-white italic mb-4">"{testimonial.review}"</p>
                {/* Customer Name */}
                <h4 className="text-lg font-semibold text-white">
                  {testimonial.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
