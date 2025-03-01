import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import DashboardRoutes from "./routes/DashboardRoutes";


function App() {
  return (
    <Routes>
      <Route path="/TD-UMS-Web/login" element={<LoginPage />} />
      <Route
        path="/TD-UMS-Web/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
