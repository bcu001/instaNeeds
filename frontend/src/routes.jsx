import { createBrowserRouter, useNavigate } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import SearchPage from "@/pages/Search";
import AccountPage from "@/pages/Account";
import Test from "@/test/Test";
import CategoryPage from "@/pages/CategoryPage";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Loading from "./components/Loading";

{
  /* Check auth signup api without role , fix it if error  */
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (authLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    navigate("/signin");
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (() => {
      return (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      );
    })(),
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/test", element: <Test /> },
    ],
  },
  { path: "signin", element: <Signin /> },
  { path: "signup", element: <Signup /> },
]);
