import AppAppBar from "./AppAppBar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <AppAppBar />
      {children}
      <Footer />
    </>
  );
}