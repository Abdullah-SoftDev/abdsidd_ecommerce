import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.type";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

const Page = async ({ params }: {  params: { category: string }}) => {
  const { category } = params; // Extracting uid from params object
  const productsRef = collection(db, 'products');
  const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
  const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as Product;
  });

  return (
    <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-center text-3xl capitalize">Explore Our {category} Collection</h2>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {fetchedProducts.map((product) => (
        <Link key={product.slug} href={`/${category}/${product.slug}`}>
          <div key={product.slug} className="group relative">
            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-64">
                <img
                  src={String(product.images[0])}
                  alt={product.productName}
                  className="w-full h-full object-center object-cover"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <span className="absolute inset-0" />
              {product.productName}
            </h3>
            <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">₹{product.price}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default Page