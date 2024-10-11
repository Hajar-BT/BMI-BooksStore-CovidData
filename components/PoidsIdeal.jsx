import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdult, setGender, calculateWeight } from '../features/poidsIdealSlice';
import Swal from 'sweetalert2';

const PoidsIdeal = () => {
  const [age, setAge] = useState('');
  const [gender, setGenderInput] = useState('');
  const dispatch = useDispatch();
  const weight = useSelector((state) => state.poidsIdeal.weight);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isAdult = age >= 18;

    if (!isAdult) {
      // Show SweetAlert if the user is not an adult
      Swal.fire({
        title: 'Oops!',
        text: 'You must be at least 18 years old to use this calculator.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    dispatch(setAdult(isAdult));
    dispatch(setGender(gender));
    dispatch(calculateWeight());
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-4">Calculate Ideal Weight</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        <select
          value={gender}
          onChange={(e) => {
            setGenderInput(e.target.value);
            dispatch(setGender(e.target.value)); // Dispatch gender to Redux
          }}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">Calculate</button>
      </form>
      {weight !== null && (
        <p className="mt-4 text-lg text-center text-gray-700">Your ideal weight is: <span className="font-bold">{weight} kg</span></p>
      )}
      {gender && (
        <div className="mt-4 text-center">
          <img 
            src={gender === 'male' ? 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png' :
                 'data:image/png;base64,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'}
            alt={gender}
            className="w-35 h-32 mx-auto rounded-full border-2 border-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default PoidsIdeal;
