
import { useState, useEffect } from "react";
import { firebase } from "../Firebase/config";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaShoppingCart, FaTshirt, FaConciergeBell, FaHome } from 'react-icons/fa';
import Link from "next/link";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const router = useRouter();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [bookings, setBookings] = useState(null);
  const [cheforders, setCheforders] = useState(null);
  const [laundryorder, setlaundryorder] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchUserData(authUser.uid);
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .get();
      if (userDoc.exists) {
        const fetchedUserData = userDoc.data();
        setUserData(fetchedUserData);
        setMobileNumber(fetchedUserData?.mobileNumber || "");
        setAddress(fetchedUserData?.address || "");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.firestore().collection("Users").doc(user.uid).update({
        mobileNumber,
        address,
      });
      setEditMode(false);
      toast.success("Profile Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating profile");
    }
  };
  const verificationMessage = userData && userData.verified
    ? "You are verified"
    : "Your verification is in process";


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const snapshot = await firebase.firestore().collection('bookings').where('email', '==', user.email).get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [user]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const snapshot = await firebase.firestore().collection('kitchenorder').where('email', '==', user.email).get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCheforders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [user]);
console.log("chefdata",cheforders)
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const snapshot = await firebase.firestore().collection('laundryorders').where('email', '==', user.email).get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setlaundryorder(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [user]);
    const [propeertenquiry, SetPropertyenq] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const snapshot = await firebase.firestore().collection('PropertyData').where('userid', '==', user.uid).get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                SetPropertyenq(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [user]);
console.log("useruid","property",user,propeertenquiry)
  const renderDetails = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="text-white bg-white  ml-4">
                <div class="flex mt-10 justify-center items-center">
   <h1 class="text-sm font-bold text-center text-red-600">*{ verificationMessage }*</h1>
 </div>
             <div className="flex flex-col font-sans  py-2 md:flex-row  bg-gray-white">
         
         <form
           onSubmit={handleSubmit}
           class="font-[sans-serif] m-6 w-full mx-auto"
         >
           {user && userData ? (
             <div>
               <div className="flex items-center justify-center">
                 {userData.photoURL ? (
                   <img
                     src={userData.photoURL}
                     alt="User"
                     className="w-20 h-20 rounded-full mb-4 md:mb-8"
                   />
                 ) : (
                   <FaUser className="w-20 h-20 rounded-full mb-4 md:mb-8" />
                 )}
               </div>
 
               <div class="grid sm:grid-cols-2 gap-10">
                 <div class="relative flex items-center">
                   <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                     Name
                   </label>
                   <input
                     type="text"
                     placeholder="Enter first name"
                     value={userData.name}
                     readOnly
                     class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                   />
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="#bbb"
                     stroke="#bbb"
                     class="w-[18px] h-[18px] absolute right-4"
                     viewBox="0 0 24 24"
                   >
                     <circle
                       cx="10"
                       cy="7"
                       r="6"
                       data-original="#000000"
                     ></circle>
                     <path
                       d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                       data-original="#000000"
                     ></path>
                   </svg>
                 </div>
                 <div class="relative flex items-center">
                   <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                     Phone No
                   </label>
                   <input
                     type="number"
                     placeholder="Enter phone no."
                     value={editMode ? mobileNumber : userData.mobileNumber}
                     onChange={(e) => setMobileNumber(e.target.value)}
                     readOnly={!editMode}
                     class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                   />
                   <svg
                     fill="#bbb"
                     class="w-[18px] h-[18px] absolute right-4"
                     viewBox="0 0 64 64"
                   >
                     <path
                       d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                       data-original="#000000"
                     ></path>
                   </svg>
                 </div>
                 <div class="relative flex items-center sm:col-span-2">
                   <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                     Email
                   </label>
                   <input
                     type="email"
                     placeholder="Enter email"
                     value={userData.email}
                     readOnly
                     class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                   />
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="#bbb"
                     stroke="#bbb"
                     class="w-[18px] h-[18px] absolute right-4"
                     viewBox="0 0 682.667 682.667"
                   >
                     <defs>
                       <clipPath id="a" clipPathUnits="userSpaceOnUse">
                         <path
                           d="M0 512h512V0H0Z"
                           data-original="#000000"
                         ></path>
                       </clipPath>
                     </defs>
                     <g
                       clip-path="url(#a)"
                       transform="matrix(1.33 0 0 -1.33 0 682.667)"
                     >
                       <path
                         fill="none"
                         stroke-miterlimit="10"
                         stroke-width="40"
                         d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                         data-original="#000000"
                       ></path>
                       <path
                         d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                         data-original="#000000"
                       ></path>
                     </g>
                   </svg>
                 </div>
               </div>
               <textarea
                 placeholder="Address"
                 value={editMode ? address : userData.address}
                 onChange={(e) => setAddress(e.target.value)}
                 readOnly={!editMode}
                 class="px-4 py-3.5 bg-white mt-4 text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                 rows="4"
               ></textarea>
 
               <div className="flex justify-center mt-4">
                 <button
                   type="button"
                   onClick={() => setEditMode(true)}
                   className={`mr-4 px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded hover:bg-red-600 ${
                     editMode ? "hidden" : "block"
                   }`}
                 >
                   Edit Profile
                 </button>
                 <button
                   type="submit"
                   className={`px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded hover:bg-red-600 ${
                     editMode ? "block" : "hidden"
                   }`}
                 >
                   Submit
                 </button>
              
             
               </div>
             </div>
           ) : (
            <div className="flex justify-center items-center h-screen">
          <button type="button"
            className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
            Loading
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin" viewBox="0 0 24 24">
              <path fillRule="evenodd"
                d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.376-1.453A8.978 8.978 0 0 1 21 12a9 9 0 0 1-4.874 8l.117.03a1 1 0 0 1 .727 1.213 1 1 0 0 1-1.213.727l-4-1a1 1 0 0 1-.59-1.525l2-3a1 1 0 0 1 1.665 1.11l-.755 1.132a7.003 7.003 0 0 0 2.735-11.77z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
           )}
         </form>
         <ToastContainer />
       </div>
          </div>
        );
      case 'Booking':
        return (
          <div className="text-white mt-4 ml-4">
          <div>
            <section className="container mx-auto px-6 lg:py-16 py-36 font-mono">
                <h1 className='text-red-600 text-center font-bold text-4xl'>Our Orders</h1>
                {loading && <div className="flex justify-center items-center h-screen">
          <button type="button"
            className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
            Loading
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin" viewBox="0 0 24 24">
              <path fillRule="evenodd"
                d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.376-1.453A8.978 8.978 0 0 1 21 12a9 9 0 0 1-4.874 8l.117.03a1 1 0 0 1 .727 1.213 1 1 0 0 1-1.213.727l-4-1a1 1 0 0 1-.59-1.525l2-3a1 1 0 0 1 1.665 1.11l-.755 1.132a7.003 7.003 0 0 0 2.735-11.77z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
}
{!loading && bookings.length === 0 && (
          <p className="text-black text-center mt-4">No Orders. Please make an order.</p>
        )}
                {!loading && bookings && bookings.length > 0 && (
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 font-[sans-serif]">
    <thead class="bg-gray-100 whitespace-nowrap">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Customer Name
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Order Details
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Payment
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booking Date
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
    {bookings && bookings.map(booking => (
      <tr key={booking.id} >
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Name}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Propertyname}-{booking.roomType}-{booking.roomprice}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Payment}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <dl className="grid sm:flex gap-x-3 text-sm">
                <dt className="min-w-36 max-w-[200px] text-gray-500">Check In date:</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{booking.bookingDate.checkInDate}</dd>
              </dl>
              {booking.bookingDate.checkOutDate && (
  <dl className="grid sm:flex gap-x-3 text-sm">
    <dt className="min-w-36 max-w-[200px] text-gray-500">Check Out date:</dt>
    <dd className="font-medium text-gray-800 dark:text-gray-200">{booking.bookingDate.checkOutDate}</dd>
  </dl>
)}

        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <Link href={`/bookingdetails?orderId=${booking.orderId}`}>
                                                                            <a className="bg-blue-500 text-white px-2 py-1 rounded">
                                                                                Booking Details
                                                                            </a>
                                                                        </Link>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
                        </div>
                    </div>
                )}
            </section>
        </div>
          </div>
        );
      case 'Laundry Booking':
        return (
          <div className="text-white mt-4 ml-4">
              <section className="container mx-auto px-6 lg:py-16 py-36 font-mono">
                <h1 className='text-red-600 text-center font-bold text-4xl'>Our Orders</h1>
                {loading && <div className="flex justify-center items-center h-screen">
          <button type="button"
            className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
            Loading
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin" viewBox="0 0 24 24">
              <path fillRule="evenodd"
                d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.376-1.453A8.978 8.978 0 0 1 21 12a9 9 0 0 1-4.874 8l.117.03a1 1 0 0 1 .727 1.213 1 1 0 0 1-1.213.727l-4-1a1 1 0 0 1-.59-1.525l2-3a1 1 0 0 1 1.665 1.11l-.755 1.132a7.003 7.003 0 0 0 2.735-11.77z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
}
{!loading && laundryorder.length === 0 && (
          <p className="text-black text-center mt-4">No Orders. Please make an order.</p>
        )}
                {!loading && laundryorder && laundryorder.length > 0 && (
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 font-[sans-serif]">
    <thead class="bg-gray-100 whitespace-nowrap">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Customer Name
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Service
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Order Details
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Payment
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booking Date
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
    {bookings && bookings.map(booking => (
      <tr key={booking.id} >
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Name}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Service}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <div>
                    <p>No. of Garments: {booking.Noofgarment}</p>
                    <p>Tenure: {booking.selectedTenure}</p>
                    <p>Price: {booking.totalpayment}</p>
                </div>
        
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Payment}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.bookingDate instanceof Object ? (
    // If bookingDate is an object, extract checkIn or checkOut
    <>
        <p>Check In: {booking.bookingDate.checkIn}</p>
        {booking.bookingDate.checkOut ? (
            <p>Check Out: {booking.bookingDate.checkOut}</p>
  ) : null}
    </>
) : (
    // If bookingDate is a string, display it directly
    <p>{booking.bookingDate}</p>
)}

        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <Link href={`/laundrybookingdetails?orderId=${booking.orderId}`}>
                                                                            <a className="bg-blue-500 text-white px-2 py-1 rounded">
                                                                                View Details
                                                                            </a>
                                                                        </Link>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
                        </div>
                    </div>
                )}
            </section>
          </div>
        );
      case 'Aren Chef Booking':
        return (
          <div className="text-white mt-4 ml-4">
            <div>
            <section className="container mx-auto px-6 lg:py-16 py-36 font-mono">
                <h1 className='text-red-600 text-center font-bold text-4xl'>Our Orders</h1>
                {loading &&  <div className="flex justify-center items-center h-screen">
          <button type="button"
            className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
            Loading
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin" viewBox="0 0 24 24">
              <path fillRule="evenodd"
                d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.376-1.453A8.978 8.978 0 0 1 21 12a9 9 0 0 1-4.874 8l.117.03a1 1 0 0 1 .727 1.213 1 1 0 0 1-1.213.727l-4-1a1 1 0 0 1-.59-1.525l2-3a1 1 0 0 1 1.665 1.11l-.755 1.132a7.003 7.003 0 0 0 2.735-11.77z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
}
{!loading && cheforders.length === 0 && (
          <p className="text-black text-center mt-4">No Orders. Please make an order.</p>
        )}
                {!loading && cheforders && cheforders.length > 0 && (
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 font-[sans-serif]">
    <thead class="bg-gray-100 whitespace-nowrap">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Customer Name
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
       Thalli Name
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Order Details
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Payment
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booking Date
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
    {cheforders && cheforders.map(booking => (
      <tr key={booking.id} >
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.firstName}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.thaliname}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <div>
                    <p>No. of Thalli: {booking.noofthalli}</p>
                    <p>Tenure: {booking.selectedTenure}</p>
                    <p>Price: {booking.Foodcharge}</p>
                </div>
        
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.Payment}
        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        {booking.bookingDate instanceof Object ? (
    // If bookingDate is an object, extract checkIn or checkOut
    <>
        <p>Check In: {booking.bookingDate.checkIn}</p>
        {booking.bookingDate.checkOut ? (
            <p>Check Out: {booking.bookingDate.checkOut}</p>
  ) : null}
    </>
) : (
    // If bookingDate is a string, display it directly
    <p>{booking.bookingDate}</p>
)}

        </td>
        <td class="px-6 py-4 text-sm text-[#333]">
        <Link href={`/arenechefdetails?orderId=${booking.orderId}`}>
                                                                            <a className="bg-blue-500 text-white px-2 py-1 rounded">
                                                                                Booking Details
                                                                            </a>
                                                                        </Link>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
                        </div>
                    </div>
                )}
            </section>
        </div>
          </div>
        );
        case 'Propert Enquiry':
          return (
            <div className="text-white mt-4 ml-4">
              <div>
              <section className="container mx-auto px-6 lg:py-16 py-36 font-mono">
                  <h1 className='text-red-600 text-center font-bold text-4xl'>Property Enquiry</h1>
                  <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600">
                <th className="py-3 px-4 border-b border-gray-300 text-left">Name</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Phone</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Property Name</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Property Location</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Confimation Status</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Enquiry Date</th>
              </tr>
            </thead>
            <tbody>
              {propeertenquiry.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 border-b text-black border-gray-300">{item.name}</td>
                  <td className="py-3 px-4 border-b text-black border-gray-300">{item.phone}</td>
                  <td className="py-3 px-4 border-b text-black border-gray-300">{item.propertyname}</td>
                  <td className="py-3 px-4 border-b text-black border-gray-300 text-xs">{item.propertylocation}</td>
                  <td className="py-3 px-4 border-b text-black border-gray-300 text-xs">
  {item.confirmstatus ? item.confirmstatus : '------'}
</td>

                  <td className="py-3 px-4 border-b text-black border-gray-300">{item.enquiryDate}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              </section>
          </div>
            </div>
          );
      default:
        return null;
    }
  };
  const handlePostProperty = () => {
    if (userData && userData.verified) {
      // User is verified, proceed with posting property
      router.push('/PostProperty')
      // Replace this line with actual logic to post property
    } else {
      // User is not verified
      toast.error("You are not a verified user. Verification is under process.Contact on 9871713129 number to post your property");
    }
  };
  return (
    <div className='flex flex-col md:flex-row h-screen md:mt-6 mt-28'>
      <div className="bg-gray-800 text-white w-full md:w-64 flex-shrink-0">
        <h1 className='text-white font-bold text-lg text-center mb-4 mt-12'>Dashboard</h1>
        <ul className="flex flex-wrap md:flex-col md:flex-nowrap space-y-1 md:space-y-0 grid grid-cols-3 md:grid-cols-1 gap-4">
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Profile' ? 'bg-white text-black font-bold ' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick('Profile')}
          >
            <FaUser className="w-6 h-6 mr-2" />
            Profile
          </li>
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Booking' ? 'bg-white text-black font-bold' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick('Booking')}
          >
            <FaShoppingCart className="w-6 h-6 mr-2" />
            Booking
          </li>
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Laundry Booking' ? 'bg-white text-black font-bold' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick('Laundry Booking')}
          >
            <FaTshirt className="w-6 h-6 mr-2" />
            Arene Laundry
          </li>
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Aren Chef Booking' ? 'bg-white text-black font-bold' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick('Aren Chef Booking')}
          >
            <FaConciergeBell className="w-6 h-6 mr-2" />
            Aren Chef
          </li>
          
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Aren Chef Booking' ? 'bg-white text-black font-bold' : 'hover:bg-gray-700'}`}
           
          >
            <a onClick={handlePostProperty}  className="flex">
            <FaHome className="w-6 h-6 mr-2" />
           Post Property
           </a>
          </li>
          <li
            className={`flex items-center pl-2 py-1 cursor-pointer transition-all ${activeTab === 'Propert Enquiry' ? 'bg-white text-black font-bold' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick('Propert Enquiry')}
          >
             <FaHome className="w-6 h-6 mr-2" />
            Property Enquiry
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-white">
        {renderDetails()}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
