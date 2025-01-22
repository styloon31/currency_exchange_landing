"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function FormTabs() {
  const [activeTab, setActiveTab] = useState("Buy"); // Active tab state

  const [inrAmount, setInrAmount] = useState("");
  const [forexAmount, setForexAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(86.70);
  const [conversionRateSell, setConversionRateSell] = useState(85.50);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const exchangeRates = {
    USD: { buyRate: 85.00, sellRate: 88.00, symbol: "$" },
    EUR: { buyRate: 88.00, sellRate: 96.00, symbol: "€" },
    GBP: { buyRate: 105.00, sellRate: 111.00, symbol: "£" },
    AUD: { buyRate: 53.00, sellRate: 59.00, symbol: "A$" },
    CAD: { buyRate: 59.00, sellRate: 66.00, symbol: "C$" },
    SGD: { buyRate: 62.00, sellRate: 68.00, symbol: "S$" },
    JPY: { buyRate: 0.52, sellRate: 0.650, symbol: "¥" },
    CHF: { buyRate: 95.50, sellRate: 94.20, symbol: "CHF" },
    THB: { buyRate: 2.535, sellRate: 2.500, symbol: "฿" },
    AED: { buyRate: 22.00, sellRate: 25.00, symbol: "د.إ" },
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    setConversionRate(exchangeRates[currency].buyRate);
    setConversionRateSell(exchangeRates[currency].sellRate)
    resetAmounts();
  };

  const resetAmounts = () => {
    setInrAmount("");
    setForexAmount("");
  };

  const handleInrChange = (e) => {
    const inr = e.target.value;
    setInrAmount(inr);
    setForexAmount(inr ? (inr / conversionRate).toFixed(2) : "");
  };

  const handleForexChange = (e) => {
    const forex = e.target.value;
    setForexAmount(forex);
    setInrAmount(forex ? (forex * conversionRate).toFixed(2) : "");
  };

  const validateForm = () => {
    if (!name || !phone || !inrAmount || !forexAmount) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required!",
      });
      return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Phone number must be exactly 10 digits!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const requestData = {
      name,
      phone,
      forexAmount,
      inrAmount,
      selectedCurrency,
      conversionRate,
      city,
      timestamp: new Date(),
    };

    // Determine collection based on activeTab
    const collectionName =
      activeTab === "Buy" ? "buy-requests" : "sell-requests";

    try {
      await addDoc(collection(db, collectionName), requestData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Your ${activeTab} request has been submitted successfully!`,
      });

      setName("");
      setPhone("");
      setCity("");
      resetAmounts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const renderForm = () => {
    if (activeTab === "Sell") {
      return (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form fields for Sell */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select City
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Delhi NCR</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Forex Amount
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gray-100 text-gray-700 font-mono px-4 py-2 rounded-lg border">
                {exchangeRates[selectedCurrency].symbol}
              </span>
              <input
                type="number"
                value={forexAmount}
                onChange={handleForexChange}
                placeholder="Forex Amount"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Inr Amount
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border">
                ₹
              </span>
              <input
                type="number"
                value={inrAmount}
                onChange={handleInrChange}
                placeholder="INR Amount"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <span className="text-gray-500 text-sm">
                1 = ₹ {conversionRateSell}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Request a Callback
            </button>
          </div>
        </form>
      );
    } else if (activeTab === "Buy") {
      return (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select City
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Delhi NCR</option>
            </select>
          </div>

          {/* INR Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pay</label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border">
                ₹
              </span>
              <input
                type="number"
                value={inrAmount}
                onChange={handleInrChange}
                placeholder="INR Amount"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <span className="text-gray-500 text-sm">
                1 = ₹ {conversionRate}
              </span>
            </div>
          </div>

          {/* Forex Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Forex Amount
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gray-100 text-gray-700 font-mono px-4 py-2 rounded-lg border">
                {exchangeRates[selectedCurrency].symbol}
              </span>
              <input
                type="number"
                value={forexAmount}
                onChange={handleForexChange}
                placeholder="Forex Amount"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Request a Callback
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-md border">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "Buy"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Buy")}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "Sell"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Sell")}
        >
          Sell
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">{renderForm()}</div>
      </div>
    </div>
  );
}
