import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart, "hekko");
  const dispatch = useDispatch();

  return <>{cart.length > 0 ? <FilledCart items={cart} /> : <EmptyCart />}</>;
};

const FilledCart = ({ items }) => {
  return (
    <>
      <h1>Your cart</h1>

      <thead>
        <tr>
          <th>Name</th>
          <th>Images</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Totol Price (NPR)</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <tr key={item?._id}>
                <td>{item?.name}</td>
                <img
                  src={item?.images[0]}
                  alt={item?.name}
                  
                />
                <td>{item?.price}</td>
                <td>{item?.quantity}</td>
                {/* <td>{item?.name}</td> */}
              </tr>
            );
          })}
      </tbody>
    </>
  );
};
const EmptyCart = () => {
  return (
    <>
      <h1>Your cart is Empty !</h1>
      <button>
        <h2>
          <Link to="/products">Go to Products</Link>
        </h2>
      </button>
    </>
  );
};
export default Cart;
