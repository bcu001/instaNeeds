import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import AccountPage from "@/pages/AccountPage";
import Test from "@/test/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/account", element: <AccountPage /> },
      // {path:'/test', element: <Test/>}
    ],
  },
]);
