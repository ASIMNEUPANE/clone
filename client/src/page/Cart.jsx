import React from "react";
import { SERVER_URL } from "../constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce(
      (acc, obj) => acc + Number(obj?.quantity) * Number(obj?.price),
      0
    );
  };

  return (
    <>
      {cart.length > 0 ? (
        <FilledCart items={cart} getTotal={getTotal} />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const FilledCart = ({ items, getTotal }) => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead className="bg-gray-200">
          <tr className="grid grid-cols-5 text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Images</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Total Price (NPR)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map((item) => (
              <tr key={item?._id} className="grid grid-cols-5 text-left border-b">
                <td className="py-2 px-4">{item?.name}</td>
                <td className="py-2 px-4">
                  <img
                    width={40}
                    height={40}
                    src={SERVER_URL + "/" + item?.images[0]}
                    alt={item?.name}
                  />
                </td>
                <td className="py-2 px-4">{item?.price}</td>
                <td className="py-2 px-4">{item?.quantity}</td>
                <td className="py-2 px-4">{item?.quantity * item?.price}</td>
              </tr>
            ))}
          <tr className="grid grid-cols-5 text-left">
            <td className="py-2 px-4 font-bold">Total Carts</td>
            <td className="py-2 px-4 font-bold">{getTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart is Empty!</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        <Link to="/products">Go to Products</Link>
      </button>
    </div>
  );
};

export default Cart;
