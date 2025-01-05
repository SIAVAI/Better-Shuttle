/* eslint-disable react/no-unescaped-entities */
import nigga from "../../assets/service/about_us/person.jpg";
import tool from "../../assets/service/about_us/parts.jpg";
const About = () => {
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row gap-6">
          <div className="relative lg:w-1/2">
            <img src={nigga} className="w-3/4 rounded-lg shadow-2xl" />
            <img
              src={tool}
              className="w-1/2 rounded-lg border-8 border-white absolute right-5 top-1/2 shadow-2xl"
            />
          </div>
          <div className="w-[50%] mt-4">
            <p className="text-2xl text-[#FF3811] font-bold mb-4">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-bold">
              We are qualified & of experience in this field
            </h1>
            <p className="py-6">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomized words which don't look even
              slightly believable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
