import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("/api/contact", form);
      if (res.status === 200) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Request a Service</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-neutral text-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition text-white"
        >
          Send Request
        </button>
        {status && <p className="mt-3 text-sm text-green-400">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
