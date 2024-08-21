import { useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";

function RecentProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, error, isError } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  // Filter products based on search term
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}  
 
  <div className="relative mt-4">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
  </div>


        
      {/* Product Grid */}
      <div className="grid mt-10 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {filteredProducts.map((p) => (
          <ProductItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default RecentProducts;
