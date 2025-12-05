
"use client";
import { useEffect,useState,useContext } from "react";
import Productcard from "./components/Productcard";
import Loader from "./components/Loader";
import { SearchContext } from "./context/Searchcontext";
export default  function Home() {

  const[products1,setProducts1]=useState([]);
  const[loading,setLoading]=useState(true);
  const{searchQuery}=useContext(SearchContext);

  useEffect(()=>{
    async function loadProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts1(data);
      setLoading(false);
    }
    loadProducts();
  },[]);

  const filteredProducts = products1.filter((p)=>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(loading) return <Loader/>;
  return (
    <>
    <div className="w-full max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Productcard key={p.id} product={p} />
            ))
          ) : (
            // <p className="text-gray-500 text-lg p-6 text-center">No products found</p>
            <div className="flex w-full justify-center col-span-full">
  <p className="text-gray-500 text-lg p-6 text-center">
    No products found
  </p>
</div>
          )}
      </div>
    </div>
    </>
  );
}
