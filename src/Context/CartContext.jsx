import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export const CartContext =  createContext();


 export default function CartContextProvider({children}){
    const token = localStorage.getItem('token')
    function getUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function AddUserCart(pId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
            productId: pId
        } , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function UpdateUserCart(id , count){
        return axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+ id , {
            count: count
        } , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function deleteUserCart(id ){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+ id , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function checkOutSessions(cartId , shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` , 
            {
                "shippingAddress":shippingAddress
            },  {
                headers: {
                    token
                }
            }
    ) 
    .then(data => data)
    .catch(err => err)
       }



        const [cartItem, setcartItem] = useState(0)
    async function getCart(){
        const responce = await getUserCart()
        if (responce.data.status == 'success') {
            setcartItem(responce.data.numOfCartItems)
        }
    }
    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={  {cartItem ,checkOutSessions, setcartItem, getUserCart , AddUserCart , UpdateUserCart, deleteUserCart}  }>
        {children}
    </CartContext.Provider>
 }