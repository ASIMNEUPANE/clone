import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          <a href="/">Your Logo</a>
        </div>
        <Link to="/" style={{ marginLeft: "10px" }} />

        <nav>
          
          <Link
            to="/home"
          
            style={{ fontSize: "1.4rem" }}
          >
            Product
          </Link>
          <Link
            to="/home"
           
            style={{ fontSize: "1.4rem" }}
          >
            Product
          </Link>
          <Link
            to="/home"
            style={{ fontSize: "1.4rem" }}
          >
            Product
          </Link>
        </nav>
      </nav>
    </header>
  );
};
