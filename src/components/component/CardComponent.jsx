import { Link } from 'react-router-dom';

const CardComponent = ({ title, link }) => {
    return (
        <Link to={link} className="block p-4 bg-[#103A5E] shadow-md rounded-lg hover:shadow-lg transition duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-white  text-lg">{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default CardComponent;