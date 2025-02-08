import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUsername(username);
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="">
        <div className="ml-[300px] flex h-screen justify-center items-center flex-col bg-blue-100">
          <h2 className="text-3xl mb-4 text-gray-700 font-semibold">Selamat datang</h2>
          <h1 className="text-4xl mb-4 text-gray-700 font-semibold">{username}</h1>
          <p className="text-gray-500">Mari buat data berita terbaru</p>
          <p>👈 Klik Categori Pada Menu Untuk Mengelola Data</p>
        </div>
      </div>
    </>
  );
}

export default Home;
