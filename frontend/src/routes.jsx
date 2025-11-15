import { createBrowserRouter, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import AccountPage from "@/pages/AccountPage";
import Test from "@/test/Test";
import CategoryPage from "@/pages/CategoryPage";
import SignupPage from "@/pages/SignupPage";
import SigninPage from "@/pages/SigninPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Loading from "./components/Loading";
import NoNavbarLayout from "./layouts/NoNavbarLayout";
import Error404Page from "./pages/Error404Page";

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
  // Main Layout
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/account/privacy", element: <Test /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/*", element: <Error404Page /> },
    ],
  },

  // no navbar layout
  {
    element: (
      <ProtectedRoute>
        <NoNavbarLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/account", element: <AccountPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },

  // no signin required for this routes below
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/test", element: <Test /> },
]);