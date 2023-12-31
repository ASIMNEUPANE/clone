import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {create} from '../slices/orderSlice'
import {  useNavigate } from "react-router";
import { removeAll } from "../slices/cartSlice";
export default function checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart);
  const getTotal = () => {
    return cart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0);
  };
 
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    paymentMethod: "COD",
  
    amount: 0,
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const payload = checkout;
    const {amount,...rest}= payload;
    rest.amount = getTotal();

    const products = cart.map((item)=>{
      return{
        product:item?._id,
        quantity:Number(item?.quantity),
        price:Number(item?.price),
        amount:Number(item?.quantity) * Number(item?.price),
      }
    })
    rest.products= products;
   const resp = await dispatch(create(rest))
   if(resp.payload.msg === 'success'){
    navigate('/products')
    dispatch(removeAll())
   }
   
  }
  return (
    <div className="flex">
      <div className="md:w-1/3 md:order-2 mb-4">
        <h4 className="flex justify-between items-center mb-3">
          <span className="text-muted">Your cart</span>
          <span className="badge bg-secondary badge-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li
                key={index}
                className="p-3 list-group-item flex justify-between items-center"
              >
                <div>
                  <h6 className="my-0">
                    <span className="badge bg-secondary">{item?.quantity}</span>
                    &nbsp;
                    {item?.name.length > 25
                      ? item?.name.substring(0, 28).concat("...")
                      : item?.name}
                  </h6>
                  <small className="text-muted">
                    {item?.description && item?.description.length > 30
                      ? item?.description.substring(0, 50).concat("...")
                      : item?.description}
                  </small>
                </div>
                <span className="text-muted">
                  {Number(item?.price) * Number(item?.quantity)}
                </span>
              </li>
            ))
          ) : (
            <>Your Cart is Empty</>
          )}

          <li className="list-group-item flex justify-between items-center">
            <span>Total (NPR)</span>
            <strong>{getTotal()}</strong>
          </li>
        </ul>
      </div>

      <div className="md:w-2/3 md:order-1">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="flex">
            <div className="w-1/5 mb-3">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Asim Neupane"
                value={checkout?.name}
                onChange={(e) =>
                  setCheckout((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <div className="invalid-feedback">
                Valid Full name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              Email <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={checkout?.email}
              onChange={(e) =>
                setCheckout((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="text">
              Address <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
             
              placeholder="charnumber,kapilvastu"
              value={checkout?.address}
              onChange={(e) =>
                setCheckout((prev) => ({ ...prev, address: e.target.value }))
              }
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="text">
              Country <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
             
              placeholder="Nepal"
              value={checkout?.country}
              onChange={(e) =>
                setCheckout((prev) => ({ ...prev, country: e.target.value }))
              }
            />
           
          </div>

          

          <div className="gap-2">
            <button
              className="btn-secondary btn-lg btn-block"
              onClick={(e) => handleSubmit(e)}
            >
              Continue to checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
