import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { DatePicker } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const BanqueetProperty = () => {
  const [Buydetaildata, setBuydetaildata] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // New state for form loading
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyname: '',
    propertylocation: '',
    AgentId: '',
    CallBack: "No"
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        router.push('/signin'); // Redirect to sign-in page
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const db = firebase.firestore();
    const BuyRef = db.collection('Banqueethalldetail').doc(id);

    BuyRef.get().then((doc) => {
      if (doc.exists) {
        setBuydetaildata(doc.data());
      } else {
        console.log('Document not found!');
      }
      setIsLoading(false);
    });
  }, []);
  console.log("banqueetdetail",Buydetaildata)

  useEffect(() => {
    if (Buydetaildata) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`; // Format the date and time
  
      setFormData({
        ...formData,
        propertyname: Buydetaildata?.BanqueethallName || '',
        propertylocation: Buydetaildata?.location || '',
        userid: user?.uid || '',
        CallBack:'NO',
        Type:'Banqueet Hall',
        confirmstatus:'Pending',
        AgentId: Buydetaildata?.AgentId || '',
        enquiryDate: formattedDate // Set the current date and time
      });
    }
  }, [Buydetaildata]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const db = firebase.firestore();
      await db.collection('PropertyData').add(formData);
      toast.success('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Error submitting reservation. Please try again later.');
    }

    setFormLoading(false);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const getDescription = () => {
    const words = Buydetaildata.description?.split(' ');
    if (!words) return '';
    if (isDescriptionExpanded) return Buydetaildata.description;
    return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  };

  return (
    <div className='py-4'>
      <ToastContainer />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <button type="button"
            className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
            Loading
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin" viewBox="0 0 24 24">
              <path fillRule="evenodd"
                d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.414.038A8.973 8.973 0 0 1 21 12a9 9 0 0 1-5.068 8.098 1 1 0 0 1-.707 1.864l-3.5-1a1 1 0 0 1-.557-1.517l2-3a1 1 0 0 1 1.664 1.11l-.755 1.132a7.003 7.003 0 0 0 3.006-11.5 1 1 0 0 1 .039-1.413z"
                clipRule="evenodd" data-original="#000000" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-center flex-wrap md:flex-nowrap container mx-auto p-4">
          <div className="w-full md:w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-full">
              <Carousel showThumbs={false} autoPlay>
                {Buydetaildata.imgSrc?.map((image, index) => (
                  <div key={index}>
                    <img src={image} className='h-96 w-full object-cover' alt={`Image ${index}`} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="p-4">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">{Buydetaildata.BanqueethallName}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {Buydetaildata.location}
              </p>
              <div className="mt-2 space-y-2">
                <p>{getDescription()} 
                {Buydetaildata.description?.split(' ').length > 20 && (
                  <button onClick={toggleDescription} className="text-blue-500 ml-2">
                    {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Details</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Advance Payment: {Buydetaildata.AdvancePayment}</li>
                    <li>Airconditioner: {Buydetaildata.Airconditioner}</li>
                    <li>Alcohal: {Buydetaildata.Alcohal}</li>
                    <li>Aquaguard: {Buydetaildata.Aquaguard}</li>
                    <li>Decoration: {Buydetaildata.Decoration}</li>
                    <li>DJ Sound: {Buydetaildata.DjSound}</li>
                    <li>Firecracker: {Buydetaildata.Firecracker}</li>
                    <li>Food Type: {Buydetaildata.Foodtype}</li>
                    <li>Seating Capacity: {Buydetaildata.SeatingCapacity}</li>
                    <li>Parking Space: {Buydetaildata.Parking}</li>
                    <li>WiFi: {Buydetaildata.wifi}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pricing</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Vegetarian per plate: {Buydetaildata.vegperplate}</li>
                    <li>Non-Vegetarian per plate: {Buydetaildata.nonvegperplate}</li>
                    <li>Without Food Price: {Buydetaildata.WithoutFoodPrice}</li>
                  </ul>
                </div>
              </div>
              
             
              <div className="relative mt-4">
                <div className="aspect-w-16 aspect-h-9">
                  <video controls className="rounded-lg shadow-lg">
                    <source src={Buydetaildata.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 bg-white shadow-xl rounded-xl overflow-hidden mt-2 w-full md:w-[380px]">
            <form onSubmit={handleSubmit} className="relative border-8 border-neutral-900 p-6 rounded-lg grid gap-8 md:flex-1 md:max-w-lg bg-white dark:bg-neutral-800 w-full">
              <h2 id="contact" className="text-3xl font-bold">Let's Connect</h2>
              <div className="relative">
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange}
                  className="peer w-full py-2 border-4 border-[#43d3b0] rounded-md focus:ring-4 dark:focus:ring-offset-2 focus:ring-[#43d3b0] focus:border-[#43d3b0] focus:outline-none dark:bg-[#43d3b0] dark:text-neutral-900 placeholder-transparent" />
                <label htmlFor="name"
                  className="text-neutral-500 text-sm font-bold uppercase absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300 ">Your Name
                </label>
              </div>
              <div className="relative">
                <input type="text" name="phone" placeholder="Your Mobile Number " onChange={handleChange}
                  className="peer w-full py-2 border-4 border-[#43d3b0] rounded-md focus:ring-4 dark:focus:ring-offset-2 focus:ring-[#43d3b0] focus:border-[#43d3b0] focus:outline-none dark:bg-[#43d3b0] dark:text-neutral-900 placeholder-transparent" />
                <label htmlFor="phone"
                  className="text-neutral-500 text-sm font-bold uppercase absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300 ">Your Mobile Number</label>
              </div>
              <button type="submit" disabled={formLoading}
                className="w-full py-3 bg-[#43d3b0] text-white rounded-md font-bold uppercase hover:bg-[#2aa68f] transition-colors duration-300">
                {formLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanqueetProperty;
