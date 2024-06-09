// src/components/HeroSectionComponent.js

const HeroSectionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      {/* <img src="/assets/logo.png" alt="Logo" className="h-16 mb-4" /> */}
      <h1 className="text-7xl font-bold text-gray-800">Water, Energy, Food</h1>
      <h2 className="text-2xl font-semibold text-purple-600 mb-4">Geographic Information System</h2>
      <p className="max-w-xl text-gray-600 mb-8">
        This project is in the early stages as part of a collaborative research between Universitas Pendidikan Ganesha and KMUTT Geospatial
        Engineering and Innovation Center (KGEO).
      </p>
      <div className="flex space-x-4">
        <a href="/map">
          <button className="btn btn-primary">Get Started</button>
        </a>

        <button className="btn btn-outline">User Guide</button>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
