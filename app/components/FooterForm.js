"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default function FooterForm() {
  const [name, setName] = useState(""); // Name input
  const [phone, setPhone] = useState(""); // Phone input

  const validateForm = () => {
    // Check if fields are filled
    if (!name || !phone) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Both fields are required!",
      });
      return false;
    }

    // Validate phone number (10 digits)
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

    if (!validateForm()) return; // If validation fails, stop execution

    const templateParams = {
      name, // Name from the form
      phone, // Phone number from the form
    };

    try {
      // Send email via EmailJS
      await emailjs.send(
        "service_ehcbiso", // Replace with your EmailJS service ID
        "template_cr8rxfq", // Replace with your EmailJS template ID
        templateParams,
        "vvGN1-pLIvz-Gc4AQ" // Replace with your EmailJS user ID
      );

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your request has been submitted successfully!",
      });

      // Reset form fields
      setName("");
      setPhone("");
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col font-Helvetica"
    >
      {/* Input Fields in a Single Row */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center justify-center gap-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="mt-1 block w-full h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm"
            required
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Number"
            className="mt-1 block w-full h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm"
            required
          />
        </div>
      </div>

      {/* Button on Next Line */}
      <button
        type="submit"
        className="mt-4 w-fit bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Request a Callback
      </button>
    </form>
  );
}
