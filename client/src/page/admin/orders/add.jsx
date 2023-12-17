import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../slices/productsSlice";
import useOrder from "../../../hooks/useOrder";
import { useSelector, useDispatch } from "react-redux";

export default function add() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { create } = useOrder();
  const { products: allProducts } = useSelector((state) => state.products);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    amount: "",
  });

  const [item, setItem] = useState({
    product: "",
    quantity: 0,
    amount: 0,
    price: 0,
  });
  const [products, setProducts] = useState([]);

  const handleAddingProducts = (e) => {
    e.preventDefault();
    if (!item || !item.product || !item?.quantity) return;
    const newProduct = [...products, item];
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        amount: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
    setItem({
      product: "",
      quantity: 0,
      amount: 0,
      price: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = order;
      payload.products = products;
      const result = await create(payload);
      if (result.msg === "success") {
        alert("Order created successfully");
        navigate("/admin/orders");
      }
    } catch (e) {
      alert(e);
    }
  };

  const removeProduct = (id) => {
    const newProduct = products.filter((product) => product.product !== id);
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        amount: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
  };

  const fetInt = useCallback(async () => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetInt();
  }, [fetInt]);

  return (
    <div class="grid grid-cols-4 gap-3 m-3 ">
      <div class="bg-gray-200 rounded-sm">
        <form onSubmit={handleSubmit}>
          <div class="mb-4 ">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              class="mt-1 p-2 w-full border rounded-md"
              value={order.name}
              onChange={(e) => {
                setOrder((prev) => {
                  {
                    return { ...prev, name: e.target.value };
                  }
                });
              }}
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              email
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              class="mt-1 p-2 w-full border rounded-md"
              value={order.email}
              onChange={(e) => {
                setOrder((prev) => {
                  {
                    return { ...prev, email: e.target.value };
                  }
                });
              }}
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              class="mt-1 p-2 w-full border rounded-md"
              value={order.address}
              onChange={(e) => {
                setOrder((prev) => {
                  {
                    return { ...prev, address: e.target.value };
                  }
                });
              }}
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              PaymentMethod
            </label>
            <select
              value={order?.paymentMethod}
              onChange={(e) => {
                setOrder((prev) => {
                  return { ...prev, paymentMethod: e.target.value };
                });
              }}
            >
              <option>Open this select menu</option>

              <option value="COD">COD</option>
              <option value="STRIPE">STRIPE</option>
            </select>
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Amount
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              disabled
              class="mt-1 p-2 w-full border rounded-md"
              value={order?.amount}
            />
          </div>

          <div class="flex items-center justify-end">
            <button
              type="submit"
              class="bg-gray-200 text-white px-4 py-2 rounded-md"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>

      <div class="bg-gray-200 col-span-1 rounded-sm">
        <form onSubmit={handleAddingProducts}>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Products
            </label>
            <select
              onChange={(e) => {
                setItem((prev) => {
                  return {
                    ...prev,
                    product: e.target.value,
                    price: allProducts.find(
                      (item) => item?._id === e.target.value
                    ).price,
                  };
                });
              }}
            >
              <option>Open this select memu</option>
              {allProducts && allProducts?.length > 0
                ? allProducts.map((prod) => {
                    return (
                      <option key={prod?._id} value={prod?._id}>
                        {prod?.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Qunatity
            </label>
            <input
              type="text"
              value={item.quantity}
              onChange={(e) => {
                setItem((prev) => {
                  return {
                    ...prev,
                    quantity: e.target.value,
                    amount: Number(e.target.value) * Number(item?.price),
                  };
                });
              }}
            />
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              price
            </label>
            <input type="text" value={item?.price} />
          </div>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              amount
            </label>
            <input type="text" value={item?.amount} />
          </div>
          <button type="submit">Add product</button>
        </form>
      </div>
      <div class="bg-gray-200 col-span-2 rounded-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {
                      allProducts.find((item) => item?._id === product?.product)
                        .name
                    }
                  </td>
                  <td>{product?.quantity}</td>
                  <td>{product?.price}</td>
                  <td>{product?.amount}</td>
                  <td onClick={() => removeProduct(product?.product)}>
                    delete
                  </td>
                </tr>
              );
            })}
        </tbody>
      </div>
    </div>
  );
}
