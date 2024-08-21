import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerityResetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      EmailCode: '',
    },
    validationSchema: Yup.object({
      EmailCode: Yup.string().required('Verification EmailCode is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
          EmailCode: values.EmailCode,
        });
        toast.success('EmailCode verified. You can now reset your password.');
        navigate('/resetPassword'); // Navigate to the reset password page
      } catch (error) {
        toast.error('Invalid or expired verification EmailCode');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2 className='text-green-600'>Reset your account password</h2>
      <form onSubmit={formik.handleSubmit} className='my-2'>
  <label htmlFor="EmailCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your EmailCode</label>
  <input type="text"  onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="EmailCode" 
          id="EmailCode" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.EmailCode && formik.errors.EmailCode ? <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg mt-2 bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.EmailCode}
            </div> : null}
        <button type="submit" className='bg-green-700 text-white my-2 p-2 rounded-2xl hover:bg-green-500 transition-all duration-300' disabled={formik.isSubmitting}>
          Verify 
        </button>
      </form>
    </div>
  );
};

export default VerityResetPassword;
