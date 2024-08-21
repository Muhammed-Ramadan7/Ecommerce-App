import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import LayOut from "./Components/LayOut/LayOut";
import NotFound from "./Components/NotFound/NotFound";
import Allorders from "./Components/Allorders/Allorders";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from "./Context/CartContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider, { WishListContext } from "./Context/WishListContext";
import ForgetPassword from "./Components/ForgetPaswword/ForgetPassword";
import VerityResetPassword from "./Components/VerityResetPassword/VerityResetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

const x = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: (
            <ForgetPassword />
        ),
      },
      {
        path: "VerityResetPassword",
        element: (
            <VerityResetPassword />
        ),
      },
      {
        path: "resetPassword",
        element: (
            <ResetPassword />
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


//!
const myClient = new QueryClient({
  defaultOptions : {
    queries :{
      // staleTime : 0 ,


    gcTime: 3000 ,
    // enabled: ()=>  ,
    // staleTime : 10 * 1000 ,
    // refetchInterval: 1000 ,
    // refetchIntervalInBackground: true ,
    // retryDelay  : 5000
    // retry : (count)=>{
    //   if(count > 5 
    // }
    // staleTime : 0
    }
  }
});
function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
        <CounterContextProvider>
          <RouterProvider router={x}></RouterProvider>
        </CounterContextProvider>
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <Toaster/>
      <ReactQueryDevtools />
    </QueryClientProvider>

    //
  );
}

export default App;
