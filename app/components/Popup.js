"use client";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import Swal from "sweetalert2"; // SweetAlert2

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false); // Controls popup visibility
  const [name, setName] = useState(""); // Name input
  const [phone, setPhone] = useState(""); // Phone input
  const [email, setEmail] = useState(""); // Email input

  // Automatically open popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const validateForm = () => {
    // Validate name, phone, and email
    if (!name || !phone || !email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required!",
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid email address!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // If validation fails, stop execution

    // Prepare data for EmailJS
    const templateParams = {
      name, // Name from the form
      phone, // Phone from the form
      email, // Email from the form
    };

    try {
      // Send email using EmailJS
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
      setEmail("");
      togglePopup(); // Close the popup
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
    <>
      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-2 border-blue-400 rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Popup Content */}
            <h2 className="text-lg font-bold mb-4">Get Expert Help</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <div className="flex items-center">
                  <span className="border rounded-l-md px-3 bg-gray-100 text-gray-600">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your mobile no"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full border rounded-r-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Request a Call Back
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
