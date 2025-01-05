/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowAllCar = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cars, setCars] = useState([]);

  // Fetch cars based on filters, sorting, pagination, and search
  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/all-cars?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data.cars);
        setTotalCars(data.totalCount);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    getCars();
  }, [currentPage, filter, itemsPerPage, search, sort]);

  const numberOfPages = Math.ceil(totalCars / itemsPerPage);

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          {/* Filter Dropdown */}
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              value={filter}
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By</option>
              <option value="automatic">Automatic Transmission</option>
              <option value="manual">Manual Transmission</option>
              <option value="recondition">Reconditioned</option>
            </select>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-red-400 focus-within:ring-red-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Search by Brand or Model"
              />
              <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600">
                Search
              </button>
            </div>
          </form>

          {/* Sort Dropdown */}
          <div>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              value={sort}
              className="border p-4 rounded-md"
            >
              <option value="">Sort By</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="seatsAsc">Seats: Fewest to Most</option>
              <option value="seatsDesc">Seats: Most to Fewest</option>
            </select>
          </div>

          {/* Reset Button */}
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <div
              key={car.car_id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {car.brand} {car.model}
                </h3>
                <p className="text-gray-600">Price: ${car.price}</p>
                <p className="text-gray-600">Seats: {car.sit_number}</p>
                <p className="text-gray-600">
                  Transmission: {car.transmission_type}
                </p>
                <p
                  className={`text-sm ${
                    car.status === "Sold"
                      ? "text-red-500 font-extrabold"
                      : "text-green-500 font-extrabold"
                  }`}
                >
                  {car.status}
                </p>
              </div>
              <div className="p-4">
                <Link
                  to={`/car-details/${car.car_id}`}
                  className={`btn w-full px-4 py-2 text-white font-semibold hover:bg-red-300 ${
                    car.status === "Sold"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ef4444] hover:bg-[#ef4444]"
                  }`}
                  disabled={car.status === "Sold"}
                >
                  {car.status === "Sold" ? "Unavailable" : "Buy Now"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded-md disabled:cursor-not-allowed hover:bg-[#ef4444] hover:text-white"
        >
          Previous
        </button>

        {[...Array(numberOfPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === num + 1
                ? "bg-[#ef4444] text-white"
                : "bg-gray-200 hover: hover:text-white"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded-md disabled:cursor-not-allowed hover:bg-[#ef4444] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowAllCar;
