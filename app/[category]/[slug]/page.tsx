import RecommendedProductSlider from "./components/RecommendedProductSlider";
import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { doc, getDoc } from "firebase/firestore";
import ImageGallery from "./components/ImageGallery";
import Features from "./components/Features";
import AddToCartButton from "./components/AddToCartButton";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const productRef = doc(db, "products", slug);
  const docSnapshot = await getDoc(productRef);
  const productData = docSnapshot.data() as Product;
  return (
    <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
        {/* Image gallery */}
        <ImageGallery productData={productData} />
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

              <Features productData={productData} />
            </section>

            <div className="pt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Change the availablity in your region
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500"></div>
              <form className="mt-5 sm:flex sm:items-center">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    name="search"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter pincode..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Check
                </button>
              </form>
            </div>

            <div className="mt-10 space-x-5 flex sm:flex-col1">
              <AddToCartButton productData={productData}/>
              <button
                type="button"
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <RecommendedProductSlider />
    </div>
  );
}
