import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!order) return (
    <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-8">
      <p className="font-medium">Order not found</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Order #{order.orderId||"N/A"}</h1>
          <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Customer Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {order.userId?.name || "Unknown"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {order.userId?.email || "Unknown"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Order Total:</span> 
                <span className="text-xl font-bold text-blue-600 ml-2">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">Products Ordered</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{product.productId?.name || "Unknown Product"}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;