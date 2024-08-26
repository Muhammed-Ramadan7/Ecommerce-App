import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

 export const WishListContext =  createContext();


 export default function WishListContextProvider({children}){
    const {token} = useContext(UserContext);
    function getUserWishList(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function AddUserWishList(pId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            productId: pId
        } , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }
    function deleteUserWishList(id ){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+ id , {
            headers: {
                token
            }
        })

        .then(data => data)
        .catch(err => err)
    }



        const [WishListItem, setWishListItem] = useState(0)
    async function getWishList(){
        const responce = await getUserWishList()
        if (responce.data.status == 'success') {
            setWishListItem(responce.data.numOfCartItems)
        }
    }

    return <WishListContext.Provider value={  {getWishList , getUserWishList , AddUserWishList, WishListItem,deleteUserWishList,setWishListItem,   }  }>
        {children}
    </WishListContext.Provider>
 }