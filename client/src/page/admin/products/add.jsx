import React, { useState, useEffect, useCallback } from "react";
import useCategory from "../../../hooks/useCategory";

export default function add() {
  const { list } = useCategory();
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <div className="container mx-auto my-8">
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
                  style={{ objectFit: 'contain' }}


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

          <select id="cat">
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
      </form>
    </div>
  );
}
