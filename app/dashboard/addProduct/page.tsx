import { Product } from "@/types/typescript.type";
import ImageUploading from "./components/ImageUploading";

const page = () => {
  async function handleSubmit(e: FormData) {
    'use server'
    const productName = e.get('productName')?.toString();
    const slug = e.get('slug')?.toString();
    const desc = e.get('desc')?.toString();
    // const file = e.get('fileUpload') as File;
    const price = parseFloat(e.get('price')?.toString() || '0');
    const category = e.get('category')?.toString();
    if (!price || !category || !productName || !desc || !slug) return;
    const product: Product = {
      productName,
      slug,
      desc,
      price,
      category,
    }
    console.log("Server action", product)
  }
  return (
    <form action={handleSubmit} className="space-y-8  mx-auto max-w-5xl px-2 py-14">
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
          <label htmlFor="first-name"
            className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="productName"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="slug"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700 pb-1">
            Description
          </label>
          <textarea
            name="desc"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>

        <ImageUploading />

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="price"
              autoComplete="family-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="mt-1">
            <select
              name="category"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option>IWATCH ULTRA</option>
              <option>AIRPOD</option>
              <option>T-SHIRTS</option>
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
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Publish
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
