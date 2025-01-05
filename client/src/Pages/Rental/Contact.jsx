import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import map from "../../assets/rental/map.jpg";

function useZoomEffect(value, zoomRange) {
  return useTransform(value, [0, 1], [1, zoomRange]);
}

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useZoomEffect(scrollYProgress, 1.2);

  return (
    <div
      ref={ref}
      className="relative bg-black text-white py-16 px-4 overflow-hidden my-16"
    >
      {/* Parallax Map Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${map})`,
          scale,
        }}
      ></motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto">
        {/* CTA */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Still Have Questions?{" "}
          <span className="text-yellow-500">Contact Us!</span>
        </h2>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:yellow-red-500 outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:yellow-red-500 outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:yellow-red-500 outline-none"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:yellow-red-500 outline-none"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow run dev-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Info Section */}
          <div className="flex flex-col justify-center items-center text-center space-y-6">
            <h3 className="text-3xl font-semibold">Let’s Get in Touch!</h3>
            <p className="text-gray-400">
              Feel free to reach out to us for any questions or inquiries. We’re
              here to help!
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Email:</strong> support@bettershuttle.com
              </p>
              <p className="text-gray-300">
                <strong>Phone:</strong> +1 234 567 890
              </p>
              <p className="text-gray-300">
                <strong>Address:</strong> 123 Main Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
