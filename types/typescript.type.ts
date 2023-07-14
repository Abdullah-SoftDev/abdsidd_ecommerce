export type Product = {
  productName: string;
  slug: string;
  desc: string;
  price: number;
  category: string;
  images: (string | File)[];
};
