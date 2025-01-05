import { SlCalender } from "react-icons/sl";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

const Time = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center gap-4 bg-[#151515] mb-8 py-10 px-4">
      <div className="flex justify-center items-center gap-4">
        <SlCalender className="text-[#FF3811]  text-4xl" />
        <div>
          <h2 className="text-xl font-bold text-white">
            We are open monday-friday
          </h2>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FFFFFF]">
            7:00 am - 9:00 pm
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <FaPhoneAlt className="text-[#FF3811] text-4xl" />
        <div>
          <h2 className="text-xl font-bold text-white"> Have a question?</h2>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FFFFFF]">
            +2546 251 2658
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <FaMapLocationDot className="text-[#FF3811] text-4xl" />
        <div>
          <h2 className="text-xl font-bold text-white">
            Need a repair? our address
          </h2>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FFFFFF]">
            Alley, Bracu
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Time;
