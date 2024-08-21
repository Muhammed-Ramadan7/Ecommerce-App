import { useContext, useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import WishListItem from '../WIshListItem/WishListItem';

function WishList() {
  const [WishListDetails, setWishListDetails] = useState([]);
  const { getUserWishList, deleteUserWishList } = useContext(WishListContext);

  async function getLoggedUserWishList() {
    const response = await getUserWishList();
    if (response.data.status === 'success') {
      setWishListDetails(response.data.data);
    }
  }

  async function deleteWishList(id) {
    const response = await deleteUserWishList(id);
    if (response.data.status === 'success') {
      setWishListDetails((prevDetails) =>
        prevDetails.filter((item) => item._id !== id)
      );
      toast.success('Deleted');
    }
  }

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <h2 className='text-green-700 my-2'>Wish List</h2>
        <div className='flex justify-between mb-3 items-center'></div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Add?</th>
            </tr>
          </thead>
          <tbody>
            {WishListDetails?.map((item) => (
              <WishListItem
                deleteWishList={deleteWishList}
                key={item._id}  // Use the unique identifier _id
                price={item.price}  // Assuming price is a property of each item
                product={item}  // Pass the whole product object or specific properties if needed
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WishList;
