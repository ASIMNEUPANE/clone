import { Link, NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
const ENavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg  rounded-sm gap-2">
      <div className="container mx-auto flex gap-40 items-center">
        <Link to="/" className="text-lg font-semibold">
          Home
        </Link>
        <NavLink
          to="/products"
          className={({ isActive }) => {
            ` ${isActive ? "text-orange-700" : "text-gray-700"}`;
          }}
        >
          Products
        </NavLink>
        <Link to="/about" className="text-lg">
          About
        </Link>
        <Link to="/cart" className="text-lg">
          Cart
        </Link>
        <Link to="/login" className="text-lg">
          <CiLogin/>
        </Link>
        
      </div>
    </nav>
  );
};

export default ENavbar;
