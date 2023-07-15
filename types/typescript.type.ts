import { Timestamp } from "firebase/firestore";

export type Product = {
  productId:string,
  productName: string;
  slug: string;
  desc: string;
  price: number;
  quantity: number;
  category: string;
  images: (string | File)[];
  createdAt?: Timestamp;
};
