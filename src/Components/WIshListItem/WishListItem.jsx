import React, { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishListItem({ price, product, deleteWishList }) {
  const { AddUserCart, setcartItem } = useContext(CartContext);

  async function addUserCartButton(id) {
    const response = await AddUserCart(id);
    if (response.data.status === 'success') {
      setcartItem(response.data.numOfCartItems);
      toast.success('Added');
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img
          src={product?.imageCover}
          className="w-16 md:w-32 max-w-full max-h-full"
          alt={product?.title || 'product'}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product?.title}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {price} EGP
      </td>
      <td className="px-6 py-4">
        <span
          onClick={() => deleteWishList(product._id)}
          className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Remove
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => addUserCartButton(product._id)}
          className="bg-green-700 text-white p-2 rounded-xl"
        >
          Add To Cart <FaCartPlus className="inline-block" />
        </button>
      </td>
    </tr>
  );
}
