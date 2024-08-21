import { useContext, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

function ProductDetails() {
  //! 6428eb43dc1175abc65ca0b3
  const {AddUserCart,setcartItem} = useContext(CartContext);
  const { AddUserWishList, setWishListItem } = useContext(WishListContext);
  async function addUserCartButton(id){
     const responce = await AddUserCart(id);
     console.log(responce);
     if (responce.data.status == 'success') {
      setcartItem(responce.data.numOfCartItems)
      toast.success('Added')
     }
  }
  async function addUserWishListButton(id) {
    const response = await AddUserWishList(id);
    if (response.data.status === 'success') {
      setWishListItem(response.data.numOfCartItems);
      toast.success('Added to WishList');
    }
  }

  const { id } = useParams();


  const{isLoading, isError, error, data: productDetails }= useQuery({
    queryKey: ['productDeteals', id],
    queryFn: ()=> axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id),
    select: (data)=> data.data.data
  })

 
  return (
    <>
      {productDetails == null ? (
        <Loading />
      ) : (
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-4 py-5 ">
            <img src={productDetails?.imageCover} className="w-full" alt="" />
          </div>
          <div className="col-span-8 self-center  py-5 ">
            <h2>{productDetails.title}</h2>
            <p className="my-3 font-light">{productDetails.description}</p>
            <h3 className="mb-2">{productDetails.category.name}</h3>

            <div className="flex mb-3 justify-between">
              <p>{productDetails.price} EGY</p>
              <p>
                {productDetails.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>

            </div>
              <button onClick={()=> addUserWishListButton(productDetails.id)} className="text-center text-2xl focus:text-red-600"><FaHeart/></button>
              <button onClick={()=> addUserCartButton(productDetails.id)} className="w-full bg-green-600 py-1 text-white rounded-sm">Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
