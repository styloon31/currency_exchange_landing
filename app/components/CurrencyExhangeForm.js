"use client"
import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CurrencyExchangeForm = () => {
  const [amount, setAmount] = useState(" ");
  const [currencyFrom, setCurrencyFrom] = useState("INR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const exchangeRates = {
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0098 },
    USD: { INR: 83, EUR: 0.92, GBP: 0.81 },
  };

  const handleCalculate = () => {
    if (currencyFrom && currencyTo && amount > 0) {
      const rate = exchangeRates[currencyFrom]?.[currencyTo];
      if (rate) {
        setResult(amount * rate);
      } else {
        alert("Exchange rate not available for this conversion.");
      }
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const handleSaveToFirebase = async () => {
    if (result > 0) {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, "currency-exchanges"), {
          amount,
          currencyFrom,
          currencyTo,
          result,
          timestamp: new Date(),
        });
        alert("Data saved successfully with ID: " + docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to save data.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please calculate the result first.");
    }
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Currency Exchange</h1>
      <div className="mb-4">
        <label className="block mb-2">Currency You Have:</label>
        <select
          className="w-full p-2 rounded bg-blue-800 border border-blue-700"
          value={currencyFrom}
          onChange={(e) => setCurrencyFrom(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Currency You Want:</label>
        <select
          className="w-full p-2 rounded bg-blue-800 border border-blue-700"
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-blue-800 border border-blue-700"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
      </div>
      <button
        className="bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded w-full mb-4"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {result > 0 && (
        <div className="mt-4 bg-blue-800 p-4 rounded">
          <p className="text-lg font-bold">
            {amount} {currencyFrom} = {result.toFixed(2)} {currencyTo}
          </p>
        </div>
      )}
      <button
        className={`bg-blue-400 text-white font-bold px-4 py-2 rounded w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSaveToFirebase}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save to Firebase"}
      </button>
    </div>
  );
};

export default CurrencyExchangeForm;
