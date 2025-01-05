import AboutUsSection from "./AboutUsSection";
import FeaturedSection from "./FeaturedSection";
import HomeBanner from "./HomeBanner";
import NewsLetter from "./NewsLetter";
import PhotosSection from "./PhotosSection";
import Why from "./Why";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>

      <AboutUsSection></AboutUsSection>
      <Why></Why>
      <FeaturedSection></FeaturedSection>
      <PhotosSection></PhotosSection>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
