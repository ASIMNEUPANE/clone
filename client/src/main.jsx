import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../store.jsx";
import Layout from "./Layouts/Layout.jsx";
import Home from "../src/page/Home.jsx";
import About from "../src/page/About.jsx";
import Products from "../src/page/Products.jsx";
import Cart from "../src/page/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
