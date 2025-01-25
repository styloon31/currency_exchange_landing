"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default function FormTabs() {
  const [activeTab, setActiveTab] = useState("Buy");

  const [inrAmount, setInrAmount] = useState("");
  const [forexAmount, setForexAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(86.7);
  const [conversionRateSell, setConversionRateSell] = useState(85.5);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const exchangeRates = {
    USD: { buyRate: 86.20, sellRate: 86.65, symbol: "$" },
    EUR: { buyRate: 90.45, sellRate: 91.15, symbol: "€" },
    GBP: { buyRate: 107.36, sellRate: 108.31, symbol: "£" },
    AUD: { buyRate: 54.35, sellRate: 55.05, symbol: "A$" },
    CAD: { buyRate: 60.20, sellRate: 60.90, symbol: "C$" },
    NZD: { buyRate: 48.70, sellRate: 50.00, symbol: "$" },
    AED: { buyRate: 23.52, sellRate: 23.70, symbol: "د.إ" },
    SGD: { buyRate: 64.10, sellRate: 64.75, symbol: "S$" },
    THB: { buyRate: 2.59, sellRate: 2.622, symbol: "฿" },
    CHF: { buyRate: 95.00, sellRate: 96.30, symbol: "CHF" },
    JPY: { buyRate: 0.552, sellRate: 0.577, symbol: "¥" },
    HKD: { buyRate: 11.20, sellRate: 11.65, symbol: "HK$" },
    MYR: { buyRate: 19.65, sellRate: 20.55, symbol: "RM" },
    SAR: { buyRate: 22.70, sellRate: 23.40, symbol: "﷼" },
    CNY: { buyRate: 12.10, sellRate: 12.40, symbol: "¥" },
    VND: { buyRate: 0.00350, sellRate: 0.00384, symbol: "₫" },
    IDR: { buyRate: 0.00534, sellRate: 0.00592, symbol: "Rp" },
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    setConversionRate(exchangeRates[currency].buyRate);
    setConversionRateSell(exchangeRates[currency].sellRate);
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

    const formType = activeTab === "Buy" ? "Buy" : "Sell";

    const templateParams = {
      to_name: "Admin",
      formType,
      name,
      phone,
      city,
      inrAmount,
      forexAmount,
      selectedCurrency,
      conversionRate: formType === "Buy" ? conversionRate : conversionRateSell,
    };

    try {
      await emailjs.send(
        "service_ehcbiso", // Replace with your EmailJS service ID
        "template_1yfzdmp", // Replace with your EmailJS template ID
        templateParams,
        "vvGN1-pLIvz-Gc4AQ" // Replace with your EmailJS user ID
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Your ${formType} request has been submitted successfully!`,
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
              onSubmit={handleSubmit}
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
              onSubmit={handleSubmit}
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
