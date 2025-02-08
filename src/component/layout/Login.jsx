import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi.");
      return;
    }
    try {
      const response = await login({ email, password });
      const { token } = response.data;
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;

      // Simpan token dan waktu kadaluarsa di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", expiryTime);
      localStorage.setItem("username", email);

      setMessage("Login successful!");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "gagal masuk silahkan coba lagi");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
      </div>
      <div className="text-end text-sm">
        <button onClick={() => navigate("/forgot-password")} className="text-blue-700 ">
          Lupa Password?
        </button>
      </div>
      <button type="submit" className="bg-blue-600  hover:bg-blue-700 text-white p-2 w-full">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>} {/* Menampilkan error */}
      {message && <p className="text-green-500">{message}</p>} {/* Menampilkan pesan sukses */}
      <p className="text-center">
        Belum punya akun?{" "}
        <button onClick={() => navigate("/register")} className="text-blue-700">
          Register
        </button>{" "}
      </p>
    </form>
  );
};

export default LoginForm;
