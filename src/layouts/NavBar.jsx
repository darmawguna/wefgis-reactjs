import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className=" top-0 z-10">
        <div className="navbar ">
          <div className="navbar-start ">
            <img src="/public/logo.png" alt="Logo" className="h-6" />
            <a className="btn btn-ghost normal-case text-xl font-semibold" href="/">
              WEF GIS
            </a>
          </div>
          <div className="navbar-start  lg:flex  px-8">
            <ul className="menu menu-horizontal px-1">
              <li className="mr-4">
                <a className="font-semibold" href="#welcome">
                  Welcome
                </a>
              </li>
              <li className="mr-4">
                <a className="font-semibold" href="#background">
                  Background
                </a>
              </li>
              <li className="mr-4">
                <a className="font-semibold" href="#data-specs">
                  Data Specs
                </a>
              </li>
              <li className="mr-32">
                <a className="font-semibold" href="#user-guide">
                  User Guide
                </a>
              </li>
              <li className="mr-4">
                <Link className="font-semibold" to="/dashboard" >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
