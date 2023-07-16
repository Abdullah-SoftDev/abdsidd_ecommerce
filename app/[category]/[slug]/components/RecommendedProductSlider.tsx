import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

const RecommendedProductSlider = async ({ slug, category }) => {
  const productsRef = collection(db, 'products');
  const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
  const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as Product;
  });

  const filteredProducts = fetchedProducts.filter((product) => product.slug !== slug);

  return (
    <div className="mx-auto max-w-5xl px-2 lg:px-0 py-14">
      <h2 className="text-center text-3xl">Recommended Products⚡</h2>
      <div className="mt-8 relative">
        <div className="overflow-x-scroll scrollbar-hide">
          <ul
            role="list"
            className="flex space-x-8"
          // style={{ width: `${products.length * 64}px` }}
          >
            {filteredProducts?.map((product) => (
              <li key={product?.slug} className="flex-shrink-0 w-64">
                <div className="group relative">
                  <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                    <img
                      src={product?.images[0]}
                      alt={product?.productName}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">{product?.category}</p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                      <Link href={`/${category}/${product?.slug}`}>
                        <span className="absolute inset-0" />
                        {product.productName}
                      </Link>
                    </h3>
                    <p className="mt-1 text-gray-900">{product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProductSlider;
