import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../service/authService";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetToken = localStorage.getItem("resetToken");
    const tokenExpiry = localStorage.getItem("resetTokenExpiry");

    if (!resetToken || !tokenExpiry || new Date().getTime() > tokenExpiry) {
      setError("Token tidak valid atau telah kadaluarsa.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    try {
      const response = await resetPassword({ token: resetToken, newPassword: password });
      setMessage(response.data.message);
      alert("Password berhasil diubah, silahkan login kembali.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-blue-700 min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="w-[400px] mx-auto p-6 bg-white shadow-lg rounded-md bg-gray-100 flex flex-col gap-4">
        <label>Password Baru:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-blue-800 border-[2px] text-blue-800 outline-none p-2 rounded-full" />
        <label>Konfirmasi Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-blue-800 border-[2px] text-blue-800 outline-none p-2 rounded-full" />
        <button className="bg-blue-800 text-white py-2 px-4 rounded-full" type="submit">
          Ubah Password
        </button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
