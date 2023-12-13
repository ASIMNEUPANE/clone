import React, { useCallback, useEffect, useState } from "react";
import useCategory from "../../../hooks/useCategory";
import { Link } from "react-router-dom";

export default function list() {
  const { list, deleteById } = useCategory();
  const [cats, setCats] = useState([]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const resp = await deleteById(id);
    
      if (resp) {
        await list();
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };

  const fetchCat = useCallback(async () => {
    const result = await list();
    setCats(result.data);
    return result;
  }, []);

  useEffect(() => {
    fetchCat();
  }, [fetchCat]);

  return (
    <div className="overflow-x-auto">
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
                <Link to={`/admin/categories/${cat?._id}`}></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
