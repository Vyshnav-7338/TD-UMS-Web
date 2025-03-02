import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const OrderedUsersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${BASE_URL}/api/orders/user/${user.id}`
        );

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-white">Loading orders...</div>;
  }

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-white">User Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 px-4 py-2 text-white">
                Order ID
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Products
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Total Amount
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Payment Method
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Referral User Name
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Status
              </th>
              <th className="border border-gray-600 px-4 py-2 text-white">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="text-center bg-gray-900 text-gray-200"
                >
                  <td className="border border-gray-600 px-4 py-2">
                    {order.orderId}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {order.products.map((product) => (
                      <div key={product.productId._id}>
                        {product.productId.name} (x{product.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {order.paymentMethod}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {order.referralUserName || "Own"}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {order.status}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center border border-gray-600 px-4 py-2 bg-gray-900 text-gray-200"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderedUsersScreen;
