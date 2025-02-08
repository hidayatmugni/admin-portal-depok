import { Link } from "react-router-dom";
import { FaTools } from "react-icons/fa";

const SideBar = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    window.location.href = "/";
  };

  return (
    <div>
      <div className="w-64 h-screen bg-white fixed top-0 left-0 z-50 shadow-lg">
        <div className=" m-4 border-b-2 pb-4">
          <img className="w-1/2" src="../assets/logo_depok.svg" alt="" />
        </div>
        <div>
          <Link to={"/politik"} className="flex   items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Politic</h1>
          </Link>
          <Link to="/teknologi" className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Teknologi</h1>
          </Link>
          <Link to="/olahraga" className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Olahraga</h1>
          </Link>
          <Link to="/gaya-hidup" className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Gaya Hidup</h1>
          </Link>
          <Link to="/bisnis" className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Bisnis</h1>
          </Link>
          <Link to={"/kesehatan"} className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Kesehatan</h1>
          </Link>
          <Link to="/lainnya" className="flex items-center p-4 text-lg hover:bg-blue-100 hover:cursor-pointer border">
            <FaTools className="mr-2 text-lg text-blue-500" />
            <h1>Lainnya</h1>
          </Link>
        </div>
        <button onClick={handleLogOut} className="w-full bg-red-800 p-4 text-lg hover:bg-red-700  text-white hover:cursor-pointer border bottom-0 absolute">
          Log Out
        </button>
      </div>
    </div>
  );
};
export default SideBar;
