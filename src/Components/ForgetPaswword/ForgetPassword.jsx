import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required(''),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
          email: values.email,
        });
        toast.success('Verification code sent to your email');
        navigate('/VerityResetPassword'); // Navigate to the verification code page
      } catch (error) {
        toast.error('Failed to send verification code');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2 className='text-green-600'>Please enter your verification code</h2>
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
      <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </svg>
    </div>
    <input email="text" onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
  </div>
        {formik.touched.email && formik.errors.email ? <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg mt-2 bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div> : null}
        <button type="submit" className='bg-green-700 text-white p-2 rounded-2xl hover:bg-green-500 transition-all duration-200 my-2' disabled={formik.isSubmitting}>
          Verify
        </button>
      </form>
    </div>


  );
};

export default ForgetPassword;
