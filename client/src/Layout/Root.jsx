import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <div className="font-raleway scroll-smooth">
      {/* Navbar */}
      <div className="mt-4">
        <Navbar></Navbar>
      </div>
      {/* Main Content */}
      <div className="min-h-[calc(100vh-300px)] my-10 px-8">
        <Outlet></Outlet>
      </div>
      {/* Footer */}
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
