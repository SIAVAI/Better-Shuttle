/* eslint-disable react/no-unescaped-entities */
import c1 from "../../assets/service/swhy/check.svg";
import c2 from "../../assets/service/swhy/deliveryt.svg";
import c3 from "../../assets/service/swhy/group.svg";
import c4 from "../../assets/service/swhy/person.svg";

import c6 from "../../assets/service/swhy/Wrench.svg";

const Core = () => {
  const core = [
    { id: 1, name: "100% Guranty", img: c1 },
    { id: 2, name: "Fast Delivery", img: c2 },
    { id: 3, name: "Expert Team", img: c3 },
    { id: 4, name: "24/7 Support", img: c4 },

    { id: 6, name: "Quality Service", img: c6 },
  ];
  return (
    <div className="mt-20">
      <div className="text-center">
        <h4 className="text-[#FF3811] text-2xl mb-4 font-bold">
          Core Features
        </h4>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Why Choose Us
        </h2>
        <p className="text-[#737373] text-base mb-4">
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
        {core.map((item) => (
          <div
            key={item.id}
            className="card w-96 bg-base-100 shadow-xl hover:bg-[#FF3811] hover:text-white hover:cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <figure className="px-10 pt-10">
              <img src={item.img} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Core;
