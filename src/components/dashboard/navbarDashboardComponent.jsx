import { Link } from "react-router-dom";



const NavbarDashboardComponent = () => {

    return (
        <div className="flex justify-between h-[10vh] bg-white px-4 py-4 shadow-md items-center ">
            <p className="text-2xl font-bold">Water Level Monitoring</p>
            <div>
                <Link to={'/'}>
                    <p>Home</p>
                </Link>
            </div>
        </div>
    );
}

export default NavbarDashboardComponent;
