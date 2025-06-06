"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default function DetailsForm() {
  const [formType, setFormType] = useState("Buy");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");

  const validateForm = () => {
    if (!name || !phone || !email || !currency) {
      Swal.fire({
        icon: "error",
        title: "All fields are required!",
      });
      return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must be exactly 10 digits!",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const templateParams = {
      to_name: "Admin",
      formType,
      name,
      phone,
      email,
      currency,
    };

    try {
      await emailjs.send(
        "service_ehcbiso", // Your service ID
        "template_aru7dhz", // Your template ID
        templateParams,
        "vvGN1-pLIvz-Gc4AQ" // Your public key (user ID)
      );

      Swal.fire({
        icon: "success",
        title: `${formType} Request Sent!`,
        text: "We will contact you shortly.",
      });

      setName("");
      setPhone("");
      setEmail("");
      setCurrency("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <form onSubmit={handleSubmit} className="space-y-4">
        

        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Phone Number"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Buy or Sell</label>
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            <option value="Buy">Want To Buy</option>
            <option value="Sell">Want To Sell</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Currency You Want</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="e.g. USD, EUR"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all text-sm font-semibold"
        >
          Request a Callback
        </button>
      </form>
    </div>
  );
}
