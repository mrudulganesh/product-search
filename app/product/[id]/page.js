import React from 'react';


export default async function ProductDetails ({params}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
const response = await fetch(`https://fakestoreapi.com/products/${id}`);
const product = await response.json();


  return (
    <div className='bg-white m-6 shadow p-6 rounded-lg '>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <img
        src={product.image}
         alt={product.title}
         className='w-full h-80 object-contain'
        />
        <div>
            <h1 className='text-2xl font-bold mb-2'>{product.title}</h1>
            <p className='text-gray-600 mb-4'>{product.description}</p>
            <p className='text-3xl font-bold text-blue-600 mb-4'>
                $:{(product.price * 83).toFixed(0)}
            </p>
            <button className='px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700'>
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  )
}

