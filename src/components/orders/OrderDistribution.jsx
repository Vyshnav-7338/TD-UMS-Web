import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FED766", "#2AB7CA"];

const OrderDistribution = () => {
    const [productSales, setProductSales] = useState([]);

    useEffect(() => {
        fetchProductSales();
    }, []);

	const fetchProductSales = async () => {
		try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/product-sales`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
			setProductSales(response.data);
		} catch (error) {
			console.error("Failed to fetch product sales:", error);
		}
	};

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Product Sales Distribution</h2>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={productSales}
                            cx='50%'
                            cy='50%'
                            outerRadius={80}
                            fill='#8884d8'
                            dataKey='value'
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {productSales.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default OrderDistribution;
