import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      setMessage(response.data.message || "Usuario creado con éxito.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al registrarse. Intente nuevamente."
      );
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Registro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            className="border w-full p-2 mb-3 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border w-full p-2 mb-3 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="border w-full p-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
          >
            Registrarse
          </button>
        </form>
        {message && (
          <p className="text-center text-sm mt-3 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
