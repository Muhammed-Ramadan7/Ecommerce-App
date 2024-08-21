import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import BrandItem from '../BrandItem/BrandItem';
import Modal from '../Modal/Modal';  // Import the Modal component

function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
    select: (data) => data?.data.data,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <div className='my-10 '>
      <h1 className="text-green-700 text-3xl text-center">All Brands</h1>
      <div className="grid mt-10 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 cursor-pointer">
        {data.map((p) => (
          <BrandItem key={p._id} product={p} onClick={() => handleBrandClick(p)} />
        ))}
      </div>

      <Modal brand={selectedBrand} onClose={closeModal} />
    </div>
  );
}

export default Brands;
