import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
