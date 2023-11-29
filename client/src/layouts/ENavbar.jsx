import { Link } from 'react-router-dom';

const ENavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="text-lg font-semibold">Home</Link>
        <Link to='/products' className="text-lg">Products</Link>
        <Link to='/about' className="text-lg">About</Link>
        <Link to='/cart' className="text-lg">Cart</Link>
      </div>
    </nav>
  );
};

export default ENavbar;
