import Style from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

//! Validation /////
function Login() {
  const {setToken} = useContext(UserContext)
  // !register
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
   
    email: Yup.string().required().email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z].{5,}/,
        "must be start with uppercase then at least 5 chars"
      ),
     
  });

  const navigate = useNavigate();
  const formik = useFormik({
    //! init
    initialValues: {
     
      email: "",
      password: "",
     
    },

    //! OnSubmit formik.errors {}
    onSubmit: handleSubmit,

    // validateOnMount: true ,
    //! validation

    //! YUP
    validationSchema: schema,
    // validate: function(values){
    //   let error = {};
    //   if(values.name == ''){
    //     error.name = "name is required"
    //   } else if (!/^[A-Z][a-z]{3,8}$/.test(values.name)) {
    //     error.name = "name must be start with uppercase ......"
    //   }

    //   if(values.email == "") {
    //     error.email = "email is required"
    //   }
    //   return error ;
    // }
  });
  //!
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if(data.message == "success") {
        //! home ??? token 
        navigate('/')
        setToken(data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log(formik.values);

  // console.log(formik.errors);
  useEffect(() => {
    console.log("Mounting Login");
  }, []);
  return (
    <div className="">
      <h2 className="text-green-600">Login</h2>

      {errMsg ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        </>
      ) : null}
      <form onSubmit={formik.handleSubmit} className=" mt-5 mx-auto">
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserEmail :
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            //!  Change
            //! blur

            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserPassword :
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
       
        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </button>
      </form>
                  <Link 
                    to="/forgetpassword"
                    className=" hover:text-green-600 text-2xl transition-all  duration-300"  
                  >
                    Forget Your Password?
                  </Link>
    </div>
    
  );
}

export default Login;
