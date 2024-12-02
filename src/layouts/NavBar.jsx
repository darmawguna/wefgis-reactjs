import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
// TODO perbaiki code untuk memastikan ukuran navbar tidak terlalu lebar
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 md:p-6 top-0 z-10 bg-white shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-6 md:h-8" />
          <a className="text-lg font-bold ml-2 md:text-xl" href="/">
            FMEWS
          </a>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600">Welcome</a>
          <a href="#background" className="text-gray-700 hover:text-blue-600">Background</a>
          <a href="#data-specs" className="text-gray-700 hover:text-blue-600">Data Specs</a>
          <a href="#user-guide" className="text-gray-700 hover:text-blue-600">User Guide</a>
        </nav>
        <div className="hidden md:flex">
          {/* <Link to="/dashboard" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            Login &rarr;
          </Link> */}
        </div>
        <button className="md:hidden" onClick={handleToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Drawer Menu for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col shadow-lg rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">WEF GIS</h2>
            <button onClick={handleToggle} className="text-gray-500 text-2xl">
              &times;
            </button>
          </div>
          <nav className="mt-4 space-y-4">
            <a href="/" className="text-gray-700 hover:text-blue-600 block">Welcome</a>
            <a href="#background" className="text-gray-700 hover:text-blue-600 block">Background</a>
            <a href="#data-specs" className="text-gray-700 hover:text-blue-600 block">Data Specs</a>
            <a href="#user-guide" className="text-gray-700 hover:text-blue-600 block">User Guide</a>
          </nav>
          <div className="mt-auto">
            <Link to="/dashboard" className="bg-purple-600 text-white py-2 px-4 rounded-lg block text-center hover:bg-purple-700">
              Login &rarr;
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
