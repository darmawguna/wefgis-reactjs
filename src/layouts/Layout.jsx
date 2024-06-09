import HeroSection from "../components/HeroSectionComponent";
import Navbar from "./NavBar";

const LayoutComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="content mt-4">
          {/* Konten lainnya */}
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
