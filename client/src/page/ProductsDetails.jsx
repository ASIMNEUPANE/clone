import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getById } from "../slices/productsSlice";
import { SERVER_URL } from "../constants";

export default function ProductsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);

  const fetchInit = useCallback(async () => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchInit();
  }, [fetchInit]);
  return (
    
    <div className="max-w-2xl mx-auto p-6">
      <div className="grid grid-rows-3 grid-flow-col gap-4">

      
      <img
        src={
          product.images && product?.images.length > 0
            ? SERVER_URL + "/" + product?.images[0]
            : "https://www.bootdey.com/image/380x380/FF00FF/000000"
        }
        className="row-span-3 w-20"
      />

       
        {product?.images && product?.images.length>0 ? product.images.slice(1).map((image,index)=>{
          return(
            <img  className=" w-20 cols-span-3" key={index} 
            src={
              SERVER_URL + '/' + image
            }
            />
            
          )
        }):null}
        </div>
     
    
      <h1 className="text-2xl font-semibold mb-2">{product?.name}</h1>
      <p className="text-gray-700 mb-4">{product?.price}</p>
      <p className="text-gray-800 mb-6">{product?.description}</p>

      {/* Add more details as needed */}

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add to Cart
      </button>
      </div>
  );
}
