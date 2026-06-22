import Featured from "../components/featured/Featured";
import Hero from "../components/Hero";
import Highlight from "../components/highlight/Highlight";
import Categories from "../components/categories/Categories";
import Sales from "../components/sales/Sales";
import Services from "../components/services/Services";
import Footer from "../components/footer/Footer";
import Testimonials from "../components/testimonials/Testimonials";
import Faq from "../components/faq/Faq";

export default function Home() {
  // CLEAN CODE COMMENT:
  // Layout components are kept in their native modular structure. 
  // The outer wrapper uses utility layout classes directly.
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Services />
        <Featured />
        <Sales />
        <Highlight />
        <Categories />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}