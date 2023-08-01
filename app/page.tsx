import BestSellingProducts from "@/components/BestSellingProducts";
import CategoryProducts from "@/components/CategoryProducts";
import Services from "@/components/Services";
import Slider from "@/components/Slider";

type Props = {
  searchParams: { title: string };
}

export default function Home({ searchParams }: Props) {
  console.log(searchParams.title)
  return (
    <>
      <Slider />
      <CategoryProducts />
      <BestSellingProducts />
      <Services />
    </>
  )
}
