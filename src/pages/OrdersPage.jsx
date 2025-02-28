import { useEffect, useState } from "react";
import { CheckCircle, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { BASE_URL } from "../api/api";

const OrdersPage = () => {
    const [orderStats, setOrderStats] = useState({
        totalOrders: "0",
        completedOrders: "0",
        totalRevenue: "₹0",
    });

    useEffect(() => {
        const fetchOrderStats = async () => {
            try {
				const token = localStorage.getItem("token");

				const response = await axios.get(`${BASE_URL}/api/order/stats`, {
				  headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
				  },
				});
                setOrderStats(response.data);
            } catch (error) {
                console.error("Failed to fetch order stats:", error);
            }
        };

        fetchOrderStats();
    }, []);

    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"Orders"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Orders' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
                    <StatCard
                        name='Completed Orders'
                        icon={CheckCircle}
                        value={orderStats.completedOrders}
                        color='#10B981'
                    />
                    <StatCard name='Total Revenue' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <DailyOrders />
                    <OrderDistribution />
                </div>

                <OrdersTable />
            </main>
        </div>
    );
};

export default OrdersPage;
