const NewsLetter = () => {
  return (
    <div className="bg-gray-900 text-white py-16 my-8">
      {/* Container */}
      <div className="container mx-auto px-8 lg:px-16 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">
          Subscribe to Our <span className="text-red-500">Newsletter</span>
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          Stay updated with the latest news, offers, and car tips from Better
          Shuttle. Sign up today!
        </p>

        {/* Input Form */}
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 lg:w-1/2 p-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
