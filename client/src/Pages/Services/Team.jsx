/* eslint-disable react/no-unescaped-entities */
import t1 from "../../assets/service/team/1.jpg";
import t2 from "../../assets/service/team/2.jpg";
import t3 from "../../assets/service/team/3.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Team = () => {
  const team = [
    { name: "John Doe", role: "Engine Expert", image: t1 },
    { name: "Jane Doe", role: "Engine Expert", image: t2 },
    { name: "John Doe", role: "Engine Expert", image: t3 },
  ];
  return (
    <div className="mt-10">
      <div className="text-center mt-10">
        <h4 className="text-[#FF3811] text-2xl mb-4 font-bold">~Team~</h4>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Meet Our Team
        </h2>
        <p className="text-[#737373] text-base mb-4">
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look even slightly believable.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
        {team.map((item) => (
          <div key={item._id} className="flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={item.image} alt="Service" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p className="text-[#FF3811]">{item.role}</p>
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button className="btn rounded-full bg-[#FF3811] text-white">
                    <FaFacebook />
                  </button>
                  <button className="btn rounded-full bg-[#FF3811] text-white">
                    <FaTwitter />
                  </button>
                  <button className="btn rounded-full bg-[#FF3811] text-white">
                    <FaInstagramSquare />
                  </button>
                  <button className="btn rounded-full bg-[#FF3811] text-white">
                    <FaLinkedin />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
