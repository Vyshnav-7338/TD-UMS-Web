import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/api/orders`);
				const formattedOrders = response.data.map(order => ({
					id: order._id,
					orderId: order.orderId||"N/A",
					customer: order.userId?.name || "Unknown",
					customerEmail: order.userId?.email || "Unknown",
					total: order.totalAmount,
					status: order.status,
					date: new Date(order.createdAt).toISOString().split("T")[0],
				}));
				setOrders(formattedOrders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};
		fetchOrders();
	}, []);

	// Search filter
	const filteredOrders = orders.filter(
		(order) =>
			order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customer.toLowerCase().includes(searchTerm.toLowerCase())||
			order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Order List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search orders...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Order ID
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Customer
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Total
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide divide-gray-700'>
						{filteredOrders.map((order) => (
							<motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.orderId}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.customer}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.customerEmail}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>${order.total.toFixed(2)}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											order.status === "completed"
												? "bg-green-100 text-green-800"
												: order.status === "pending"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{order.date}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'  onClick={() => navigate(`/orders/${order.id}`)}>
										<Eye size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default OrdersTable;
