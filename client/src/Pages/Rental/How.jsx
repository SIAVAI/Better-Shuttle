/* eslint-disable react/no-unescaped-entities */
const How = () => {
  return (
    <div className="container mx-auto my-10 text-black">
      <div className="relative bg-fixed bg-center bg-cover">
        {/* Content */}
        <div className="relative py-16 px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            How It Works
          </h2>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
            Renting a car has never been easier. Follow these simple steps to
            get on the road quickly and hassle-free.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-black text-2xl font-bold rounded-full">
                1
              </div>
              <h3 className="mt-4 text-2xl font-semibold">Choose Your Car</h3>
              <p className="mt-2 text-gray-800">
                Explore our wide range of cars and select the one that fits your
                style and needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-black text-2xl font-bold rounded-full">
                2
              </div>
              <h3 className="mt-4 text-2xl font-semibold">
                Book Online or Visit Us
              </h3>
              <p className="mt-2 text-gray-800">
                Use our simple booking system or visit our location to finalize
                your reservation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-black text-2xl font-bold rounded-full">
                3
              </div>
              <h3 className="mt-4 text-2xl font-semibold">Enjoy Your Ride</h3>
              <p className="mt-2 text-gray-800">
                Drive off with confidence and enjoy your smooth ride. We've got
                you covered!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
