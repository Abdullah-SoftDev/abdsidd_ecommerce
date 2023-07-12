import BestSellingProducts from "@/components/BestSellingProducts";
import CategoryProducts from "@/components/CategoryProducts";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <CategoryProducts />
      <BestSellingProducts />
      <Services />
      <Footer />
    </>
  )
}
