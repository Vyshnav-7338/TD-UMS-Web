import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, Package } from "lucide-react";
import ProductsTable from "../components/products/ProductsTable";
import { BASE_URL } from "../api/api";

const ProductsPage = () => {
	const [stats, setStats] = useState({ totalProducts: 0, lowStock: 0 });

	useEffect(() => {
		const fetchStats = async () => {
		  try {
			const token = localStorage.getItem("token"); 
			const response = await fetch(`${BASE_URL}/api/products/fetch/stats`, {
			  headers: { 
				Authorization: `Bearer ${token}` 
			  }
			});
	  
			if (!response.ok) throw new Error("Failed to fetch");
	  
			const data = await response.json();
			setStats(data);
		  } catch (error) {
			console.error("Error fetching product stats:", error);
		  }
		};
	  
		fetchStats();
	  }, []);
	  

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={stats.totalProducts} color='#6366F1' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={stats.lowStock} color='#F59E0B' />
				</motion.div>

				<ProductsTable />
			</main>
		</div>
	);
};

export default ProductsPage;
