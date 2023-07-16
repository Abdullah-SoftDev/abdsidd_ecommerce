import RecommendedProductSlider from "./components/RecommendedProductSlider";
import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { doc, getDoc } from "firebase/firestore";
import ImageGallery from "./components/ImageGallery";
import Features from "./components/Features";
import AddToCartButton from "./components/AddToCartButton";
import ServiceForm from "./components/ServiceForm";


export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const productRef = doc(db, "products", slug);
  const docSnapshot = await getDoc(productRef);
  const productData = docSnapshot.data() as Product;
  return (
    <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      
      <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
        {/* Image gallery */}
        <ImageGallery images={productData?.images} />
        {/* Product info */}
        <div className="py-4 md:py-0 px-2 sm:px-0">
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl text-gray-900">Category</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-3">
            {productData?.productName}
          </h1>
          <div className="mt-6">
            <h3 className="text-xl font-medium tracking-tight ">
              Product Description
            </h3>

            <div className="text-base text-gray-700 space-y-6">
              {productData?.desc}
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <Features slug={productData?.slug} desc={productData?.desc} />
            </section>

        <ServiceForm/>

            <div className="mt-10 space-x-5 flex sm:flex-col1">
            <AddToCartButton
  productId={productData.productId}
  productName={productData.productName}
  slug={productData.slug}
  desc={productData.desc}
  price={productData.price}
  category={productData.category}
  images={productData.images}
  quantity={productData.quantity}
/>
              <button
                type="button"
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
              >
                Buy Now
              </button>
            S</div>
          </div>
        </div>
      </div>
      <RecommendedProductSlider />
    </div>
  );
}
