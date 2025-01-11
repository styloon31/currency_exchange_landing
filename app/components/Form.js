"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function Form() {
  const [inrAmount, setInrAmount] = useState(""); // INR amount input
  const [forexAmount, setForexAmount] = useState(""); // Forex amount input
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Selected currency
  const [conversionRate, setConversionRate] = useState(86.27); // Default rate for USD
  const [name, setName] = useState(""); // Name input
  const [phone, setPhone] = useState(""); // Phone number input

  // Exchange rates and currency symbols for demo purposes
  const exchangeRates = {
    USD: { rate: 86.27, symbol: "$" },
    EUR: { rate: 92.50, symbol: "€" },
    GBP: { rate: 106.30, symbol: "£" },
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    setConversionRate(exchangeRates[currency].rate); // Update rate based on currency
    resetAmounts(); // Reset amounts when currency changes
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
    // Validate fields
    if (!name || !phone || !inrAmount || !forexAmount) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required!",
      });
      return false;
    }

    // Check phone number length
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

    if (!validateForm()) return; // Validate form before proceeding

    // Data to save in Firestore
    const requestData = {
      name,
      phone,
      forexAmount,
      inrAmount,
      selectedCurrency,
      conversionRate,
      timestamp: new Date(), // Add a timestamp
    };

    try {
      // Save data to Firestore
      const docRef = await addDoc(collection(db, "forex-requests"), requestData);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your request has been submitted successfully!",
      });

      // Reset form
      setName("");
      setPhone("");
      resetAmounts();
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-md max-w-md border border-gray-200 font-allround-medium">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 font-allround-bold">
        Buy Forex Currency
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Select City */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Select City</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
            <option>Select City</option>
          </select>
        </div>

        {/* Forex Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Forex Amount</label>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-gray-100 text-gray-700 font-mono px-4 py-2 rounded-lg border border-gray-300">
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
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        {/* Pay INR Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Pay</label>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300">
              ₹
            </span>
            <input
              type="number"
              value={inrAmount}
              onChange={handleInrChange}
              placeholder="INR Amount"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <span className="text-gray-500 font-mono text-sm">1 = ₹ {conversionRate}</span>
          </div>
        </div>

        {/* Name Field */}
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

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* WhatsApp Updates */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="whatsapp" className="form-checkbox text-blue-400" />
          <label htmlFor="whatsapp" className="text-gray-700 text-sm">
            Receive Updates on WhatsApp
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Request a Callback
          </button>
        </div>
      </form>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Guaranteed call back in 30 minutes • Home delivery offered in select metros.
      </p>
    </div>
  );
}
