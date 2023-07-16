"use client";
import { ProductFormState } from "@/types/typescript.type";
import {  doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChangeEvent, useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [uploaded, setIsUploaded] = useState<boolean>(false);

  const [product, setProduct] = useState<ProductFormState>({
    productName: "",
    slug: "",
    desc: "",
    price: 0,
    category: "",
    images: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "productName") {
      const slug = value.toLowerCase().replaceAll(' ', '-');
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        slug,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: fileArray,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true);

    const { productName, slug, desc, price, category, images } = product;

    if (!price || !category || !productName || !desc || !slug || !images) {
      alert("Please fill all required fields.");
      return;
    }

    const newProduct: ProductFormState = {
      productName,
      slug,
      desc,
      price: Number(price),
      quantity: 1,
      category:category.toLowerCase(),
      images,
      createdAt: serverTimestamp() as Timestamp,
        };

    await setDoc(doc(db, "products", `${newProduct.slug}`), newProduct);
    setIsPublishing(false);
    setIsUploaded(false)
    // Reset form fields
    setProduct({
      productName: "",
      slug: "",
      desc: "",
      price: 0,
      category: "",
      images: [],
    });
  };

  const handleSubmitImage = async () => {
    if (!product.images) return;
    try {
      setIsLoading(true);
  
      const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
      const downloadURLs: string[] = [];
  
      for (let i = 0; i < product.images.length; i++) {
        const file = product.images[i];
        const filePath = `${storageRef.fullPath}/${(file as File).name}`;
  
        await uploadBytes(ref(storage, filePath), file as Blob);
  
        const fileRef = ref(storage, filePath);
        const downloadURL = await getDownloadURL(fileRef);
  
        downloadURLs.push(downloadURL);
      }
  
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: downloadURLs,
      }));
            setIsUploaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (index: number) => {
      setProduct((prevProduct) => {
        const updatedImages = [...prevProduct.images];
        updatedImages.splice(index, 1);
        return {
          ...prevProduct,
          images: updatedImages,
        };
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 mx-auto max-w-5xl px-2 py-14"
    >
      {/* Headings */}
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add Product Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      {/* Form Inputs */}
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="slug"
              value={product.slug}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700 pb-1"
          >
            Description
          </label>
          <textarea
            name="desc"
            rows={3}
            value={product.desc}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>

        {uploaded ? (
          <p className="text-red-500 sm:col-span-6">Images gets uploaded.</p>
        ) : (
          <>
            <div className="sm:col-span-6">
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {product.images.length > 0 ? (
                  <div className="space-y-1 text-center">
                    {product.images.map((file, index) => (
                      <p
                        className="cursor-pointer"
                        key={index}
                        onClick={() => handleImageClick(index)}
                      >
                        {typeof file === "string" ? file : (file as File).name}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="fileUpload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="fileUpload"
                          name="fileUpload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-6">
              <button
                onClick={handleSubmitImage}
                type="button"
                className={`flex items-center justify-center w-full py-3 rounded-md bg-rose-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${isLoading
                    ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
                    : ""
                  }`}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </>
        )}

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              autoComplete="family-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <div className="mt-1">
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="IWATCH ULTRA">IWATCH ULTRA</option>
              <option value="AIRPOD">AIRPOD</option>
              <option value="T-SHIRTS">T-SHIRTS</option>
            </select>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isPublishing ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed": ""}`} disabled={isPublishing}>
                {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;


