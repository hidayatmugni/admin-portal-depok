import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/authService";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi input
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password lebih dari 6 karakter!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords harus sama!");
      return;
    }

    try {
      // Kirim data registrasi ke server
      const response = await register({ username, email, password });
      if (response.status === 201) {
        setMessage("Registrasi berhasil! Mengarahkan ke halaman login...");
        setError("");

        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // Tangani error dari server
      setError(error.response?.data?.message || "Registrasi gagal /  pastikan password unik mengandung huruf besar dan karakter unik");
      console.log("Registrasi error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-600  hover:bg-blue-700 text-white p-2 w-full">
        Register
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <p className="text-center">
        Sudah punya akun?{" "}
        <button onClick={() => navigate("/")} className="text-blue-700">
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
