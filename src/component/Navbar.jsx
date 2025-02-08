import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="fixed w-screen z-50 top-0 bg-gray-300">
        <nav className="flex justify-around items-center text-black relative shadow-sm  p-4 shadow-lg shadow-gray-500">
          <div className="hidden md:block lg:block">
            <img src="../assets/logo_depok.svg" alt="" />
          </div>
          <div>
            <h1 className="lg:text-xl md:text-lg text-sm font-semibold text-blue-700 lg:mr-10 md:mr-6 mr-2">Admin : {username}</h1>
          </div>{" "}
          <div>
            <GiHamburgerMenu onClick={() => setIsOpen(!isOpen)} className="text-4xl ml-4 text-blue-800/80 hover:cursor-pointer" />
          </div>
        </nav>
      </div>
      {isOpen && <SideBar />}
    </>
  );
};
export default Navbar;
