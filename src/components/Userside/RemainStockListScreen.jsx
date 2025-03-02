import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const RemainStockScreen = () => {
  const [userStock, setUserStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStock = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${BASE_URL}/api/users/${user.id}/remain-stock`
        );
        setUserStock(response.data.userStock);
      } catch (error) {
        console.error("Error fetching user stock:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStock();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        Remaining Stock List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Remaining Stock
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Added At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {userStock.length > 0 ? (
              userStock.map((product) =>
                product.stockAddedByUsers.map((entry, index) => (
                  <tr
                    key={`${product.productId}-${index}`}
                    className="hover:bg-gray-600 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 text-sm text-blue-200">
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-200">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-200">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-200">
                      {entry.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-200">
                      {new Date(entry.addedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-blue-200"
                >
                  No remaining stock available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemainStockScreen;
