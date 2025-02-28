// src/routes/DashboardRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import OverviewPage from '../pages/OverviewPage';
import ProductsPage from '../pages/ProductsPage';
import UsersPage from '../pages/UsersPage';
import SalesPage from '../pages/SalesPage';
import OrdersPage from '../pages/OrdersPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';
import AddUser from '../components/users/AddUser';
import EditUser from '../components/users/EditUser';
import AddProductScreen from '../components/products/AddProductScreen';
import POSScreen from '../components/products/POSScreen';
import UpdateStock from '../components/products/UpdateStock';
import OrderDetails from '../components/orders/OrderDetails';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<OverviewPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="pos" element={<POSScreen />} />
      <Route path="products/add" element={<AddProductScreen />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/updateStock/:productId" element={<UpdateStock />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="add-user" element={<AddUser />} />
      <Route path="/edit-user/:userId" element={<EditUser />} />
      <Route path="sales" element={<SalesPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="settings" element={<SettingsPage />} />

    </Routes>
  );
};

export default DashboardRoutes;