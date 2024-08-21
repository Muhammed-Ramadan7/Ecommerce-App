import { useContext, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

function ProductItem({ product }) {
  const { AddUserCart, setcartItem } = useContext(CartContext);
  const { AddUserWishList, setWishListItem } = useContext(WishListContext);

  async function addUserCartButton(id) {
    const response = await AddUserCart(id);
    if (response.data.status === 'success') {
      setcartItem(response.data.numOfCartItems);
      toast.success('Added to Cart');
    }
  }

  async function addUserWishListButton(id) {
    const response = await AddUserWishList(id);
    if (response.data.status === 'success') {
      setWishListItem(response.data.numOfCartItems);
      toast.success('Added to WishList');
    }
  }

  return (
    <div className="group">
      <Link to={`/productDetails/${product._id}`}>
        <img src={product.imageCover} className="w-full object-cover" alt="" />
        <p className="text-sm text-green-600 my-2">{product.category.name}</p>
        <h3 className="truncate h4 mb-2">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h3>

        <div className="flex justify-between">
          <p>{product.price} EGY</p>
          <p>
            {product.ratingsAverage} <FaStar className="text-yellow-400 inline-block" />
          </p>
        </div>
      </Link>
      <button onClick={() => addUserWishListButton(product._id)} className="text-xl my-1 focus:text-red-500 transition-all duration-300">
        <FaHeart />
      </button>
      <button onClick={() => addUserCartButton(product._id)} className="bg-green-700 text-white py-2 px-4 w-full my-3 rounded-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 translate-y-2">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
