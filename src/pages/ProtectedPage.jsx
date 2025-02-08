// utils/auth.js
import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedPage = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [navigate]);

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 text-red-600">Akses dilarang 🚫🚫🚫</h1>
      <p className="lg:text-3xl md:text-2xl text-xl font-semibold text-gray-800">harap login terlebih dahulu</p>
      <p className="lg:text-lg md:text-base text-sm mt-4 text-gray-600">Mengrahkan ke halaman login dalam 5 detik...</p>
    </div>
  );
};

export default ProtectedPage;
