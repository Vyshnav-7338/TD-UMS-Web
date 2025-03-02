import { LogOut } from "lucide-react";

const Header = ({ title, logout, onLogout }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex justify-between items-center px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
      {logout && (
        <button
          onClick={onLogout}
          className="text-red-500 hover:text-red-700 flex items-center gap-2"
        >
          <LogOut size={20} /> Logout
        </button>
      )}
    </header>
  );
};

export default Header;
