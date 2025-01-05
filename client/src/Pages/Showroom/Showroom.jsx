import CarCards from "./CarCards";
import CarLogo from "./CarLogo";
import CyberTruck from "./CyberTruck";
import ShowroomHero from "./ShowroomHero";
import Testimonials from "./Testimonials";

const Showroom = () => {
  return (
    <div>
      <ShowroomHero></ShowroomHero>
      <CarLogo></CarLogo>
      <CyberTruck></CyberTruck>
      <CarCards></CarCards>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Showroom;
