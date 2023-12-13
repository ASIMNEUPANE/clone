import React, { useState, useEffect, useCallback } from "react";
import useCategory from "../../../hooks/useCategory";
import { create } from "../../../services/products";
import { useNavigate } from "react-router-dom";
export default function add() {
  const navigate = useNavigate();
  const { list } = useCategory();
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    alias: "",
    brand: "",
    category: "",
  });
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.files) {
      if (event.target.files.length > 4) {
        alert("you can only upload 4 images ");
        setFiles([]);
      } else {
        setFiles([...event.target.files]);
      }
    }
  };

  const getAllCategories = useCallback(async () => {
    const data = await list();
    if (!data) return null;
    setCategories(data.data);
  }, []);

  const finalSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("name", payload?.name);
      formData.append("description", payload?.description);
      formData.append("quantity", payload?.quantity);
      formData.append("price", payload?.price);
      formData.append("alias", payload?.alias);
      formData.append("brand", payload?.brand);
      formData.append("category", payload?.category);

      const { data } = await create(formData);

      if (data.msg === "success") {
        setMsg(
          `${payload.name} has been created successfully. redirect in 3 second`
        );
        setTimeout(() => {
          navigate("/admin/products");
        }, 3000);
      }
    } catch (e) {
      throw new Error("something went wrong");
    } finally {
      setTimeout(() => {
        setPayload({
          name: "",
          description: "",
          quantity: "",
          price: "",
          alias: "",
          brand: "",
          category: "",
        });
      }, 2500);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);
  console.log(payload.name);
  return (
    <div className="container mx-auto my-8" onSubmit={(e) => finalSubmit(e)}>
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select an image:
          </label>
          <input
            multiple
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className="border rounded p-2 w-full"
          />

          {files.length > 0 ? (
            <div className="flex space-x-2 overflow-x-auto">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview-${index + 1}`}
                  className="w-20 h-10 object-cover"
                  style={{ objectFit: "contain" }}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product name"
            value={payload?.name}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-600"
          >
            Product Description
          </label>
          <textarea
            rows="3"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product description"
            value={payload?.description}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-600"
          >
            alias
          </label>
          <input
            type="text"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product price"
            value={payload?.alias}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, alias: e.target.value };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-600"
          >
            Product Price
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product price"
            value={payload?.price}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-600"
          >
            quantity
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product price"
            value={payload?.quantity}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, quantity: e.target.value };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-600"
          >
            Brand
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            className="mt-1 p-2 border w-full"
            placeholder="Enter product price"
            value={payload?.brand}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, brand: e.target.value };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-600"
          >
            category{" "}
          </label>
          <label for="cars">Choose a car:</label>

          <select
            value={payload?.category}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, category: e.target.value };
              });
            }}
          >
            <option value="">Select One</option>

            {categories.length > 0
              ? categories.map((cat) => {
                  return (
                    <option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
        {msg}
      </form>
    </div>
  );
}
