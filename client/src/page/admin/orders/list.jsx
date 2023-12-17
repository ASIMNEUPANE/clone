import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOrder from "../../../hooks/useOrder";

export default function list() {
  const { list, deleteById } = useOrder();
  const [orders, setOrders] = useState([]);

  const handledelete = async (e, id) => {
    e.preventDefault();
    try{
      const resp = await deleteById(id);
   
      if (resp.msg ==='success') {
        fetchOrders()
      }
    }catch(e){
      alert(e)
    }
   
  };

  const fetchOrders = useCallback(async () => {
    try{
      const resp = await list();
      setOrders(resp.data);
    }catch(e){
      alert(e)
    }
    
  }, [list]);

  useEffect(() => {
    fetchOrders();
  }, fetchOrders);
  return (
    <div className="overflow-x-auto">
      {<Link to={"/admin/orders/add"}>Add orders</Link>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">status</th>
            <th className="py-2 px-4 border-b col-span-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders?.length > 0
            ? orders.map((order, idx) => (
                <tr key={order?._id}>
                  <td className="py-2 px-4 border-b">{idx + 1}</td>
                  <td className="py-2 px-4 border-b">{order?.name}</td>
                  <td className="py-2 px-4 border-b">{order?.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={(e) => handledelete(e, order?.id)}>
                      delete
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={(e) => handleStatus(e, order?.id)}>
                      tick
                    </button>
                  </td>
                  <td className={`py-2 px-4 border-b `}>
                    <Link to={`/admin/orders/${order?._id}`}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
