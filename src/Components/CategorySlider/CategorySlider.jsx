import { useState } from 'react'
import { useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useCategories from '../../Hooks/useCategories';

function CategorySlider() {
    


   
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 3,
        arrows:false,
        
        slidesToShow: 6,

        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
          ]
      };

        const {data, isLoading,error, isError} = useCategories();

    if(isLoading) {
        return <Loading />
    }
    
  if(isError) {
    return <h3>{error}</h3>
  }
    return (
        <Slider c {...settings} >
            {
                data.map((c)=> 
                <div key={c._id} className='p-2 container mx-auto  max-w-screen-xl text-center '>
                    <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
                    <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>

                </div>)
            }
        </Slider>
    )
}

export default CategorySlider
