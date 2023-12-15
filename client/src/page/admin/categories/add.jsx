import { useState } from "react";
import useCategory from "../../../hooks/useCategory";
import { useNavigate } from "react-router";

export default function add() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const { create } = useCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await create({ name: category });
    
      navigate("/admin/categories");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div class="container mx-auto mt-8">
      <div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Create Product Category</h2>

        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              class="mt-1 p-2 w-full border rounded-md"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
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
    </div>
  );
}
