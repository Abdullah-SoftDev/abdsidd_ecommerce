import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
    params: { category: string };
};

const products = [
    {
        id: 1,
        name: 'Organize Basic Set (Walnut)',
        price: '$149',
        rating: 5,
        reviewCount: 38,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 2,
        name: 'Organize Pen Holder',
        price: '$15',
        rating: 5,
        reviewCount: 18,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 3,
        name: 'Organize Sticky Note Holder',
        price: '$15',
        rating: 5,
        reviewCount: 14,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    // More products...
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const page = async ({ params }: Props) => {
    const { category } = params; // Extracting uid from params object
    return (
        <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-center text-3xl capitalize">Explore Our {category} Collection</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-64">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.imageAlt}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    )
}

export default page