import { Navbar } from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-shrink-0 flex flex-col items-center mt-2 mb-5">
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
