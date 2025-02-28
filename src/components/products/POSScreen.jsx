import { motion } from "framer-motion";
import {
  Printer,
  Wallet,
  Search,
  Plus,
  Minus,
  X,
  ShoppingCart,
  CreditCard,
  Smartphone,
  PlusIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../api/api";

const POSScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(true);
  const [hasReferral, setHasReferral] = useState(false);
  const [userId, setUserId] = useState("");
  const [referralUserName, setReferralUserName] = useState("");

  useEffect(() => {
   
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productId?.toString().includes(searchTerm)
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      return existing
        ? prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.18;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePayment = async () => {
    if (cart.length === 0) return;

    const orderData = {
      userId,
      referralUserName: hasReferral ? referralUserName : null,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod,
      totalAmount: getTotal(),
    };

    try {
      const response = await fetch(`${BASE_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Payment successful! Order placed.");
        fetchProducts(); 
        setCart([]);
      } else {
        alert(`Failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-1 flex flex-col">
        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full pl-12 pr-6 py-4 text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Available Products</h2>
          </div>

          <div className="overflow-auto flex-1 p-4">
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                Loading products...
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-700 rounded-xl p-4 cursor-pointer relative group"
                    onClick={() => {
                      if (product.stock < 1) {
                        alert("This product is out of stock!");
                        return;
                      }
                      addToCart(product);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={
                          product.image?.name
                            ? `${BASE_URL}/cdn?file=${product.image.name}`
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="bg-blue-600 text-xs px-2 py-1 rounded-md">
                            #{product.productId}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xl font-bold text-blue-400">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <button className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusIcon size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 bg-gray-800 rounded-xl border border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart size={24} /> Order Summary
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="bg-gray-700 p-4 rounded-xl mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-1.5 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-gray-100 px-2">{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity >= item.stock) {
                          alert("Cannot add more! Stock limit reached.");
                          return;
                        }
                        updateQuantity(item._id, 1);
                      }}
                      className="p-1.5 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                      }}
                      className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white ml-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Subtotal:</span>
                  <span className="font-medium text-blue-400">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-850">
          <h3 className="text-white mb-4 font-medium">Referral</h3>
          <div className="flex gap-3">
            <label
              className={`flex items-center gap-2 text-white cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                !hasReferral ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setHasReferral(false)}
            >
              <input
                type="radio"
                name="referral"
                checked={!hasReferral}
                onChange={() => setHasReferral(false)}
                className="hidden"
              />
              Own
            </label>

            <label
              className={`flex items-center gap-2 text-white cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                hasReferral ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setHasReferral(true)}
            >
              <input
                type="radio"
                name="referral"
                checked={hasReferral}
                onChange={() => setHasReferral(true)}
                className="hidden"
              />
              Referral
            </label>
          </div>

          <input
            type="text"
            placeholder="Enter Your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full mt-4 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {hasReferral && (
            <>
              <input
                type="text"
                placeholder="Enter Referral User Name"
                value={referralUserName}
                onChange={(e) => setReferralUserName(e.target.value)}
                className="w-full mt-4 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-850">
          <h3 className="text-white mb-4 font-medium">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { method: "cash", icon: <Wallet size={20} /> },
              { method: "card", icon: <CreditCard size={20} /> },
              { method: "upi", icon: <Smartphone size={20} /> },
            ].map(({ method, icon }) => (
              <label
                key={method}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === method
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                {icon}
                <span className="text-xs text-white capitalize">{method}</span>
              </label>
            ))}
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-850">
            <h3 className="text-white mb-4 font-medium">Summary</h3>
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal:</span>
              <span className="text-white">₹{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm mt-2">
              <span>Tax (18%):</span>
              <span className="text-white">
                ₹{(getSubtotal() * 0.18).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mt-4">
              <span>Total:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              onClick={handlePayment}
              disabled={cart.length === 0}
            >
              <Wallet size={20} /> Process Payment
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default POSScreen;