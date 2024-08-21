import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Modal({ brand, onClose }) {
  if (!brand) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg relative w-1/3 h-70 object-cover mb-4  ">
        <button
          className="absolute top-2 right-2 text-black font-bold"
          onClick={onClose}
        >
          <FaTimes className='text-green-600 text-xl '/>
        </button>
        <div className='flex justify-between items-center gap-8  border-t-2 border-b-2 my-3'>
        <h2 className="text-2xl text-green-600 mb-2">{brand.name}</h2>
        <img src={brand.image} alt={brand.name} className="w-full " />
        </div>
        <div className='text-center'>
        <button onClick={onClose} className='bg-green-700 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition-all duration-500 '>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
