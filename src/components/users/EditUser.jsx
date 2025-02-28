import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "inactive",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        name: res.data.data.name,
        email: res.data.data.email,
        role: res.data.data.role.toLowerCase(),
        status: res.data.data.status.toLowerCase(),
        phone: res.data.data.phone || "",
        address: res.data.data.address || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/api/user/profile/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setTimeout(() => navigate("/users"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit User</h2>
      {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-600 text-white rounded">User updated successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Address</label>
          <input
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            type="button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;