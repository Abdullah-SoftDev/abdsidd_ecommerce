import Link from "next/link";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "/",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "/",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "/",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "/",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "/",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

  // More products...
];
const BestSellingProducts = () => {
  return (
    <div className="mx-auto max-w-5xl px-2">
      <h2 className="text-center text-3xl">Bestselling Products⚡</h2>
      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div
            className="box-content py-2 relative h-96 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900">
            <div className="absolute min-w-screen-xl px-4 flex space-x-4 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-4 xl:gap-x-8 grid-cols-2">
              {products.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="relative w-56 h-full rounded-lg  flex flex-col justify-between overflow-hidden hover:opacity-75 xl:w-auto"
                >
                  <div className="relative aspect-w-3 aspect-h-2">
                    <img
                      src={category.imageSrc}
                      alt=""
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {category.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
