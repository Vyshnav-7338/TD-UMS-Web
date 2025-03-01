import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const UpdateStock = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [userCode, setuserCode] = useState("");
  const [mode, setMode] = useState("admin");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const handleUpdateStock = async () => {
    if (mode === "user" && !userCode.trim()) {
      alert("Please enter a valid User ID.");
      return;
    }

    const endpoint =
      mode === "admin"
        ? `/updateStock/admin/${productId}`
        : `/updateStock/user/${productId}`;

    const body =
      mode === "admin"
        ? { quantity: Number(quantity) }
        : { quantity: Number(quantity), userCode };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert(mode === "admin" ? "Stock updated by Admin" : "Stock added by User");
      navigate("/products");
    } else {
      alert("Failed to update stock");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 ">
      <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Update Stock - {product.name}
        </h1>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-center">Select Mode:</label>
          <div className="flex gap-4 justify-center">
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                checked={mode === "admin"}
                onChange={() => setMode("admin")}
                className="mr-2"
              />
              Admin
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                checked={mode === "user"}
                onChange={() => setMode("user")}
                className="mr-2"
              />
              User
            </label>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded w-full text-black"
          />
        </div>

        {mode === "user" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter User ID"
              value={userCode}
              onChange={(e) => setuserCode(e.target.value)}
              className="border p-2 rounded w-full text-black"
            />
          </div>
        )}
        <button
          className={`${
            mode === "admin" ? "bg-blue-600" : "bg-green-600"
          } text-white px-4 py-2 rounded w-full`}
          onClick={handleUpdateStock}
          disabled={mode === "user" && !userCode.trim()} 
        >
          {mode === "admin" ? "Admin Update Stock" : "User Update Stock"}
        </button>
      </div>
    </div>
  );
};

export default UpdateStock;