import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Politic from "./pages/Politic";
import Olahraga from "./pages/Olahraga";
import GayaHidup from "./pages/GayaHidup";
import Lainnya from "./pages/Lainnya";
import Tecnology from "./pages/Tecnology";
import Bisnis from "./pages/Bisnis";
import Kesehatan from "./pages/Kesehatan";
import ForgotPasswordForm from "./component/layout/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordForm from "./component/layout/ResetPassword";
import ProtectedPage from "./pages/ProtectedPage";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedPage element={<Home />} />,
  },
  {
    path: "/politik",
    element: <ProtectedPage element={<Politic />} />,
  },
  {
    path: "/teknologi",
    element: <ProtectedPage element={<Tecnology />} />,
  },
  {
    path: "/olahraga",
    element: <ProtectedPage element={<Olahraga />} />,
  },
  {
    path: "/gaya-hidup",
    element: <ProtectedPage element={<GayaHidup />} />,
  },
  {
    path: "/bisnis",
    element: <ProtectedPage element={<Bisnis />} />,
  },
  {
    path: "/kesehatan",
    element: <ProtectedPage element={<Kesehatan />} />,
  },
  {
    path: "/lainnya",
    element: <ProtectedPage element={<Lainnya />} />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
