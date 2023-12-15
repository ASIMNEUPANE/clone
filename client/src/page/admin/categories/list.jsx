import React, { useCallback, useEffect, useState } from "react";
import useCategory from "../../../hooks/useCategory";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

export default function list() {
  const { list, deleteById } = useCategory();
  const [cats, setCats] = useState([]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const resp = await deleteById(id);
        if (resp) {
          Swal.fire({
            title: "Deleted!",
            text: "Delete Successful.",
            icon: "success",
          });
          await list();
        }
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };

  const fetchCat = useCallback(async () => {
    const result = await list();
    if(result){
      setCats(result.data);
    }
 
  }, [list]);

  useEffect(() => {
    fetchCat();
  }, [fetchCat]);

  return (
    <div className="overflow-x-auto">
      <Link to={"/admin/categories/add"}>Add Category</Link>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Category ID</th>
            <th className="py-2 px-4 border-b">Category Name</th>
            <th className="py-2 px-4 border-b">slug</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => (
            <tr key={cat?._id}>
              <td className="py-2 px-4 border-b">{cat?._id}</td>
              <td className="py-2 px-4 border-b">{cat.name}</td>
              <td className="py-2 px-4 border-b">{cat.slug}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={(e) => handleDelete(e, cat?._id)}>
                  delete
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/admin/categories/${cat?._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
