import { Link,  useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../slices/authSlice";
import { removeToken } from "../utils/session";
const AdminNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLockOut = () => {
    dispatch(setLogOut());
    removeToken();
    navigate("/login");
  };
  return (
    <nav className=" bg-orange-500 text-white p-4 rounded-sm gap-2">
      <div className="container mx-auto flex gap-40 items-center">
        <Link to="/admin/dashboard" className="text-lg font-semibold">
          Admin {user?.name}
        </Link>       
        <Link to="/admin/products" className="text-lg">
          Products
        </Link>
        <Link to="/admin/dashboard" className="text-lg">
          Users
        </Link>
        <Link to="/admin/dashboard" className="text-lg">
          Categories
        </Link>
        <button onClick={handleLockOut}>
          <Link to="/admin/dashboard" className="text-lg">
            <CiLogout />
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
