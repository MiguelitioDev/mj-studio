import { Outlet } from "react-router";
import { Aurora } from "./Aurora";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealObserver } from "./RevealObserver";
import { ScrollToTop } from "./ScrollToTop";
import { SkipLink } from "./SkipLink";
import { VLibras } from "./VLibras";

export function Layout() {
  return (
    <>
      <Aurora />
      <ScrollToTop />
      <RevealObserver />
      <SkipLink />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <VLibras />
    </>
  );
}
