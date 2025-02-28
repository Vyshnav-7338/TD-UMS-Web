import { motion } from "framer-motion";
import { DollarSign, Package, Warehouse, Image, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const AddProductScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (isNaN(formData.price) || formData.price < 0)
      newErrors.price = "Invalid price";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (isNaN(formData.stock) || formData.stock < 0)
      newErrors.stock = "Invalid stock quantity";
    if (!formData.image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setApiError("Unauthorized: Please log in first.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        navigate("/products");
      } else {
        setApiError(data.message || "Failed to add product");
      }
    } catch (error) {
      setApiError("An error occurred while adding the product.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </Link>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <h1 className="text-2xl font-semibold text-gray-100 mb-6">
            Add New Product
          </h1>

          {apiError && <p className="text-red-400 text-sm mb-4">{apiError}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Name
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter product name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock Quantity
              </label>
              <div className="relative">
                <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter stock quantity"
                  min="0"
                />
              </div>
              {errors.stock && <p className="text-red-400 text-sm mt-1">{errors.stock}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Image
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddProductScreen;
