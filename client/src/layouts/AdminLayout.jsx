import React from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
export default function () {
  return (
    <div>
      <AdminNavbar />
      <main className="flex-shrink-0 d-flex flex-column min-vh-100">
        <div className="container mt-2 mb-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
