import { Link, NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className=" bg-orange-500 text-white p-4 rounded-sm gap-2">
      <div className="container mx-auto flex gap-40 items-center">
        <Link to="/" className="text-lg font-semibold">
          Admin
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
      </div>
    </nav>
  );
};

export default AdminNavbar;
