import { useEffect, useState } from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import { BASE_URL } from "../api/api";

const OverviewPage = () => {
	const [stats, setStats] = useState({
		totalSales: "$0",
		newUsers: 0,
		totalProducts: 0,
		conversionRate: "0%",
	});

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/stats/dashboard`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}` // Example for JWT token
					}
				});
				const data = await response.json();
				console.log(data)
				setStats(data);
			} catch (error) {
				console.error("Error fetching stats:", error);
			}
		};
		fetchStats();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Sales' icon={Zap} value={stats.totalSales} color='#6366F1' />
					<StatCard name='Total Users' icon={Users} value={stats.totalUsers} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={stats.totalProducts} color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value={stats.conversionRate} color='#10B981' />
				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;
