import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../service/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Mengirim permintaan untuk forgot password
      const response = await forgotPassword(email);
      setMessage(response.data.message);

      const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 menit
      localStorage.setItem("resetToken", response.data.resetToken);
      localStorage.setItem("resetTokenExpiry", expiryTime);

      navigate(`/reset-password`);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Email tidak ditemukan.");
      } else {
        setError("Terjadi kesalahan, coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-700 min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="w-[400px] mx-auto p-6 bg-white shadow-lg rounded-md bg-gray-100 flex flex-col gap-4">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-blue-800 border-[2px] text-blue-800 outline-none p-2 rounded-full" placeholder="Masukkan email Anda" required />
        <button className="bg-blue-800 text-white py-2 px-4 rounded-full" type="submit">
          {loading ? "Mengirim..." : " Kirim"}
        </button>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
