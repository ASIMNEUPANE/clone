import React from "react";
import { useState } from "react";

export default function add() {
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    amount: "",
  });

  return (
    <div class="grid grid-cols-4 gap-3 ">
      <div class="bg-gray-200">
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div class="mb-4">
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
              value={order.paymentMethod}
              onChange={(e) => {
                setOrder((prev) => {
                  return { ...prev, paymentMethod: e.target.value };
                });
              }}
            >
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
              // value={category}
              // onChange={(e) => {
              //   setCategory(e.target.value);
              // }}
            />
          </div>

          <div class="flex items-center justify-end">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>

      <div class="bg-red-500 col-span-1">h</div>
      <div class="bg-red-500 col-span-2">h</div>
    </div>
  );
}
