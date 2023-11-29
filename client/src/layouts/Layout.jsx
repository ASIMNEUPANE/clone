import ENavbar from "./ENavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <ENavbar />
      <main>
        <div>
        <Outlet />
        </div>
        
      </main>

      <Footer />
    </>
  );
}
