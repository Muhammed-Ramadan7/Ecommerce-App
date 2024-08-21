import { useContext, useState } from 'react'
import Style from './Cart.module.css'
import { useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { FaTrash } from 'react-icons/fa'
import CartItem from '../CartItem/CartItem'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import CheckOut from '../CheckOut/CheckOut'

function Cart() {
    

    const [cartDetails, setcartDetails] = useState(null)
    const {getUserCart, UpdateUserCart , deleteUserCart} = useContext(CartContext)

     async function getLoggedUserCart(){
        const responce = await getUserCart()
        if (responce.data.status == 'success' ) {
          setcartDetails(responce.data.data)
          // console.log(cartDetails._id);
        }
    }
     async function updateCart(id , count){
        const responce = await UpdateUserCart(id , count)
        console.log(responce.data);
        if (responce.data.status == 'success' ) {
          setcartDetails(responce.data.data)
          toast.success('updated')
        }
    }
     async function deleteCart(id){
        const responce = await deleteUserCart(id)
        console.log(responce.data);
        if (responce.data.status == 'success' ) {
          setcartDetails(responce.data.data)
          toast.success('deleted')
        }
    }

    useEffect(()=> {
        getLoggedUserCart()
    } , [])
    return (
        <div>
<div className="relative overflow-x-auto">
    <h2 className='text-green-700 my-2'>Cart Details</h2>
    <div className='flex justify-between mb-3 items-center'>
        <p className='h3 text-green-700'>Total Price {cartDetails?.totalCartPrice}</p>
    </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
  {cartDetails?.products.map((p, index) => (
    <CartItem 
    updateCart = {updateCart}
    deleteCart = {deleteCart}
      key={index} 
      count={p.count} 
      price={p.price} 
      product={p.product} 
    />
  ))}
</tbody>
  </table>
</div>
<Link className='bg-green-700 p-2 rounded-xl text-white my-2' to = {'/checkout/' + cartDetails?._id}>Check Out Session</Link>
        </div>
    )
}
// data._id
export default Cart
