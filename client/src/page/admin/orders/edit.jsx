import React, { useCallback, useEffect, useState } from "react";
import useOrder from "../../../hooks/useOrder";
import { useParams } from "react-router";

export default function edit() {
  const { id } = useParams();
  const { getById, updateById } = useOrder();
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      return await updateById(id, order);
    } catch (e) {
      alert(e);
    }
  };

  const fetchInit = useCallback(async () => {
    try {
      const resp = await getById(id);
      setOrder(resp);
    } catch (e) {
      alert(e);
    }
  }, [id]);

  useEffect(() => {
    fetchInit();
  }, [fetchInit]);
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
              value={order?.name}
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
              value={order?.email}
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
              value={order?.address}
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
              update Orders
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
