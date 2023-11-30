import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchProducts } from "../slices/productsSlice";
import { SERVER_URL } from "../constants";

export default function Products() {
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const initFetch = useCallback(async () => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  return (
    <div className="flex flex-wrap">
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg "
            key={product?._id || index}
          >
            <img
              className="w-full"
              src={
                product?.images[0] && product?.images[0].includes("http:")
                  ? product?.images[0]
                  : SERVER_URL + "/" + product?.images[0]
              }
              alt={product.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product?.category_name}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product.price}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>
          {products.length === 0 && !loading && <div>No Products Found...</div>}
        </div>
      )}
    </div>
  );
}
