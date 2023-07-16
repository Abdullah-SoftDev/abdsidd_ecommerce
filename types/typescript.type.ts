import { Timestamp } from "firebase/firestore";

export type Product = {
  productId: string;
  productName: string;
  slug: string;
  desc: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
  createdAt?: Timestamp;
};

export type CartProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ProductFormState = {
  productName: string;
  slug: string;
  desc: string;
  price: number;
  category: string;
  images: (string | File)[];
};

export type FeatureProps = {
  slug: string;
  desc: string;
}

export type ImageGallery = {
  images: string[];
}

