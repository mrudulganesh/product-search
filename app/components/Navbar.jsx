"use client";
import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../context/Searchcontext";

const Navbar = () => {
  const { setSearchQuery } = useContext(SearchContext);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch products once
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // Suggestions
  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const match = products
      .map((p) => p.title)
      .filter((title) =>
        title.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(match);
  }, [input, products]);

  //Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      const selectd = suggestions[activeIndex];
      setInput(selectd);
      setSearchQuery(selectd);
      setSuggestions([]);
    }

    //Move up
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };
  };


  return (
    <div className="flex-1 justify-center relattive w-full fixed bg-white">
      <h1 className='text-xl font-bold text-gray-800 '>Product Store</h1>
      {/* Centered Search Bar */}
      <div className="w-full md:w-1/2  relative mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border   border-gray-300 rounded-lg px-3 py-2  focus:outline-none focus:ring focus:ring-blue-300"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInput(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 mt-1 w-full bg-white  shadow-md  rounded-lg z-50">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className={`px-3 py-2 cursor-pointer ${i === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                onClick={() => {
                  setInput(s);
                  setSearchQuery(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar
