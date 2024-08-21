import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useCategories from '../../Hooks/useCategories';

export default function Categories() {
    


   
    const [categories, setCategories] = useState([]);

        const {data, isLoading,error, isError} = useCategories();

    if(isLoading) {
        return <Loading />
    }
    
  if(isError) {
    return <h3>{error}</h3>
  }
    return (
<div className='grid mt-10 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center my-10 cursor-pointer'>
    {data.map((c) => (
        <div key={c._id} className='shadow-md p-2 bg-stone-100 rounded-lg hover:shadow-blue-300 hover:shadow-lg transition-all duration-500'>
            <img className='h-[350px] w-full object-cover' src={c.image} alt="" />
            <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>
        </div>
    ))}
</div>

    )
}

