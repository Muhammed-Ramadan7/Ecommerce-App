import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

function Home() {
 const {getCart} = useContext(CartContext)
 const {getWishList} = useContext(WishListContext)
 
 
 useEffect(() => {
       getCart()
  }, [])
  
  useEffect(() => {
    getWishList()
}, [])

  return (
   <>
   <MainSlider />
   <CategorySlider />
   <RecentProducts />
   
   </>
  );
}

export default Home;
