import { CgBmw } from "react-icons/cg";
import {FiShoppingCart} from "react-icons/fi";
import {FiLogIn} from "react-icons/fi";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center space-x-4 mb-4">
        <Link
          to="/"
          style={{ marginLeft: "10px" }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900 "
        >
          <CgBmw />
        </Link>

        <Link
          to="/products"
          style={{ marginLeft: "10px" }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900 "
        >
          Product
        </Link>

        <Link
          to="/about"
          style={{ marginLeft: "10px" }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          About
        </Link>

        <Link
          to="/cart"
          style={{ marginLeft: "10px" }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          <FiShoppingCart />
          &nbsp;
          
          {/* <Badge bg="secondary">{quantity ?? 0}</Badge> */}
        </Link>
        <Link
          to="/Login"
          style={{ marginLeft: "10px" }}
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          <FiLogIn />
        </Link>
      </nav>
    </header>
  );
};
