import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const AddedStocksScreen = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${BASE_URL}/api/users/${user.id}/stocks-user`
        );

        setStocks(response.data.addedStocks);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Added Stocks</h2>
        <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  Added At
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-600">
              {stocks.length > 0 ? (
                stocks.map((stock) => (
                  <tr
                    key={stock.productId._id}
                    className="hover:bg-gray-600 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-100">
                      {stock.productId.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                      {stock.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                      {new Date(stock.addedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 whitespace-nowrap text-sm text-center text-blue-100"
                  >
                    No stocks added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddedStocksScreen;
