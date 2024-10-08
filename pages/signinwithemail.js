import React, { useState } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../Firebase/config';
import 'firebase/auth';
import 'firebase/firestore';
import { useRouter } from 'next/router';

const Signinwithemail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      setLoading(true);
      // Sign in user with email and password
      await firebase.auth().signInWithEmailAndPassword(email.value, password.value);

      // Show success toast
      toast.success('Sign in successful');

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      toast.error('Error signing in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#e8f0fe]'>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex justify-center items-center mb-4">
          <img src="https://www.areneservices.in/public/front/images/property-logo.png" alt="Logo" className="w-20 h-20" />
        </div>
        <p className="text-center text-sm font-bold text-black font-serif">
          We'll check if you have an account, and help create one if you don't.
        </p>
        <div className="w-full max-w-full">
          <form onSubmit={handleSubmit} className="bg-opacity-70 bg-[#e8f0fe] p-6">
            <div>
              <div className="relative flex items-center">
                <input name="email" type="email" required className="bg-transparent w-full text-sm border-b border-[#333] px-2 py-3 outline-none placeholder:text-[#333]" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#333" stroke="#333" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <div className="relative flex items-center">
                <input name="password" type="password" required className="bg-transparent w-full text-sm border-b border-[#333] px-2 py-3 outline-none placeholder:text-[#333]" placeholder="Enter password" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#333" stroke="#333" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <div>
                <a href="/forgotpassword" className="text-sm font-semibold hover:underline">Forgot Password?</a>
              </div>
            </div>
            <div className="mt-10">
              <button type="submit" disabled={loading} className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#333] hover:bg-[#222] focus:outline-none">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-sm text-center mt-6">Don't have an account <a href="/signupwithemail" className="font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signinwithemail;
