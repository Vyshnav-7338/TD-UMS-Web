import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
    role: "Admin",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${BASE_URL}/api/add_user`, {
        method: "POST",
        body: formDataToSend,
        headers:{
            Authorization: `Bearer ${token}`,
        }
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("User added successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          gender: "Male",
          dob: "",
          address: "",
          role: "Admin",
          photo: null,
        });
      } else {
        setMessage(result.message || "Failed to add user.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    
    <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
       <div className="mb-8">
          <Link
            to="/TD-UMS-Web/users"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to users
          </Link>
        </div>
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Add User</h2>
      {message && (
        <p className="text-white bg-gray-700 p-2 rounded-md mb-4">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-300">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          ></textarea>
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-300">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
