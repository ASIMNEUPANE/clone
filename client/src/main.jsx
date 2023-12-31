import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, newStore } from "../store.jsx";

import Layout from "./Layouts/Layout.jsx";
import Home from "../src/page/Home.jsx";
import About from "../src/page/About.jsx";
import Products from "../src/page/Products.jsx";
import Cart from "../src/page/Cart.jsx";
import Checkout from "./page/Checkout.jsx";
import ProductsDetails from "./page/ProductsDetails.jsx";
import Login from "./page/Login.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import Dashboard from "./page/admin/Dashboard.jsx";
import { AdminRoute, PrivateRoute } from "./components/Routes.jsx";

import {
  AddProducts,
  ListProducts,
  EditProducts,
} from "./page/admin/products/index.jsx";
import {
  AddCategories,
  EditCategories,
  ListCategories,
} from "./page/admin/categories/index.jsx";
import {
  AddOrders,
  EditOrders,
  ListOrders,
} from "./page/admin/orders/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/cart", element: <Cart /> },
      { path: "/products", element: <Products /> },
      { path: `/products/:id`, element: <ProductsDetails /> },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/login",
        element: (
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute role="admin">
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <AdminRoute role="admin">
            <ListProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products/add",
        element: (
          <AdminRoute role="admin">
            <AddProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products/:id",
        element: (
          <AdminRoute role="admin">
            <EditProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <AdminRoute role="admin">
            <ListCategories />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/categories/add",
        element: (
          <AdminRoute role="admin">
            <AddCategories />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/categories/:id",
        element: (
          <AdminRoute role="admin">
            <EditCategories />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/orders",
        element: (
          <AdminRoute role="admin">
            <ListOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders/add",
        element: (
          <AdminRoute role="admin">
            <AddOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders/:id",
        element: (
          <AdminRoute role="admin">
            <EditOrders />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={newStore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
