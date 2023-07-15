import Link from "next/link";

const collections = [
  {
    imageSrc:
    "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/dOyXoEjc.webp",
  altText:
    "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  heading: "Airpods",
    href: "/airpod", // Add the desired href value
  },
  {
    imageSrc:
      "https://codeswear.com/_next/image?url=https%3A%2F%2Fcodeswear.nyc3.cdn.digitaloceanspaces.com%2Fconstants%2Flanding%2Fcollections%2Fmugs.webp&w=1920&q=75",
    altText:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    heading: "Mug",
    href: "#mug", // Add the desired href value
  },
  {
    imageSrc:
      "https://codeswear.com/_next/image?url=https%3A%2F%2Fcodeswear.nyc3.cdn.digitaloceanspaces.com%2Fconstants%2Flanding%2Fcollections%2Fmugs.webp&w=1920&q=75",
    altText:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    heading: "Mug",
    href: "#mug", // Add the desired href value
  },
  // Add more collection items with href values
];

const CategoryProducts = () => {
  return (
    <div className="mx-auto max-w-5xl px-2 py-14">
      <h2 className="text-center text-3xl pb-4">Top Collections🔥</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {collections.map((collection, index) => (
          <Link key={index} href={collection.href}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <div className="relative group">
                <img
                  src={collection.imageSrc}
                  alt={collection.altText}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                />
                <h2 className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 px-4 text-lg font-medium">
                  {collection.heading}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
