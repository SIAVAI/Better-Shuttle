import About from "./About";
import Core from "./Core";
import SBanner from "./SBanner";
import ServicesHighlight from "./ServicesHighlight";
import Team from "./Team";
import Time from "./Time";

const Services = () => {
  return (
    <div>
      <SBanner></SBanner>
      <About></About>
      <ServicesHighlight></ServicesHighlight>
      <Time></Time>
      <Core></Core>
      <Team></Team>
    </div>
  );
};

export default Services;
