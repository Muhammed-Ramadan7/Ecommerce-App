import { useState } from 'react'
import Style from './MainSlider.module.css'
import { useEffect } from 'react'


import img_1 from '../../assets/imgs/main-slider-1.jpeg'
import img_2 from '../../assets/imgs/main-slider-2.jpeg'
import img_3 from '../../assets/imgs/main-slider-3.jpeg'
import img_4 from '../../assets/imgs/slide-1.jpeg'
import img_5 from '../../assets/imgs/slide-2.jpeg'
import img_6 from '../../assets/imgs/adidas.jpg'
import img_7 from '../../assets/imgs/gitar.jpg'
import Slider from 'react-slick'
function MainSlider() {
    

    var settings = {
        dots: false,
        arrows:false ,
        // infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting MainSlider');
    } , [])
    return (
        <div className='grid grid-cols-12 mb-4 max-w-screen-md mx-auto'>
            {/* <div className="md:col-span-8 "> */}
            <Slider {...settings} className=' col-span-12 md:col-span-8 '>
               
               <img className='h-[400px] w-full object-cover object-right' src={img_1} alt="" />  
               <img className='h-[400px] w-full object-cover object-right' src={img_4} alt="" />
             
               
               <img className='h-[400px] w-full object-cover object-right' src={img_5} alt="" />
             
                
            </Slider>
            {/* </div> */}
            <div className=" col-span-12 md:col-span-4   bg-sky-400">
                <img className='md:h-[200px] w-full ' src={img_7} alt="" />
                <img className='md:h-[200px] w-full ' src={img_6} alt="" />

            </div>
        </div>
    )
}

export default MainSlider
