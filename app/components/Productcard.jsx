import React from 'react';
import Link from 'next/link';

const Productcard = ({product}) => {
  return (
    <Link href={`/product/${product.id}`}>
    <div className='bg-white shadow hover:shadow-lg duration-200 p-4 rounded cursor-pointer m-6'>
      <img
       src={product.image}
       alt={product.title}
       className='h-40 w-full object-contain mb-3 sm:h-48'
      />
      <h2 className='font-semibold text-gray-800 text-sm line-clamp-2'>
        {product.title}
      </h2>
      <p className='text-lg font-bold mt-2 text-blue-600'>
        $:{(product.price * 83).toFixed(0)}
      </p>
    </div>
    </Link>
  )
}

export default Productcard
