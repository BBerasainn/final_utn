import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyAccount() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verificando cuenta...");
  const [color, setColor] = useState("text-blue-600");
  const [called, setCalled] = useState(false); 

  useEffect(() => {
    if (called) return;
    setCalled(true);

    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify/${token}`
        );

        setStatus(res.data.message || "Cuenta verificada correctamente 🎉");
        setColor("text-green-600");
      } catch (err) {
        setStatus(
          err.response?.data?.message || "Token inválido o expirado ❌"
        );
        setColor("text-red-600");
      }
    };

    verify();
  }, [token, called]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className={`text-2xl font-bold mb-4 ${color}`}>{status}</h1>

      {color === "text-green-600" && (
        <a
          href="/"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ir al Login
        </a>
      )}
    </div>
  );
}
