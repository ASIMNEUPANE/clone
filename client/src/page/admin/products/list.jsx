import { useDispatch, useSelector } from "react-redux";
import { URLS } from "../../../constants";
import { fetchProducts } from "../../../slices/productsSlice";
import { useEffect, useCallback } from "react";
import useAPI from "../../../hooks/useAPI";
export default function list() {

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const {deleteById} = useAPI()

  const handledelete = async (id) => {
    await deleteById(URLS.PRODUCTS, id);
  };
  const handleEdit = () => {
    console.log("hello");
  };

  const fetchInit = useCallback(async () => {
    return dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetchInit();
  }, [fetchInit]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b col-span-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products?.length > 0
            ? products.map((product, idx) => (
                <tr key={product?._id}>
                  <td className="py-2 px-4 border-b">{idx + 1}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">
                    {" "}
                    <button onClick={() => handledelete(product?._id)}>
                      delete
                    </button>
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={handleEdit({ id: product?._id })}
                  >
                    edit
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
