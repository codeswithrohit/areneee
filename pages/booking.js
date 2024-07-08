import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { firebase } from '../Firebase/config';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Test = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [mobilenumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("oneday");
  const [includeDonation, setIncludeDonation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { Name, roomType, roomprice, Agentid, location, checkInDate } = router.query;
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setLoading(true);
      if (authUser) {
        setUser(authUser);
        fetchUserData(authUser.uid);
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
        router.push('/signin'); // Redirect to sign-in page
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
        setName(fetchedUserData.name || "");
        setEmail(fetchedUserData.email || "");
        setMobileNumber(fetchedUserData.mobileNumber || "");
        setAddress(fetchedUserData.address || "");
      } else {
        router.push('/signin'); // Redirect to sign-in page if user data not found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push('/signin'); // Redirect to sign-in page on error
    } finally {
      setLoading(false);
    }
  };
  const loadScript = async (src) => {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
      return true;
    } catch (error) {
      console.error('Error loading script:', error);
      toast.error('Failed to load Razorpay SDK. Please try again later.');
      return false;
    }
  };
  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    const now = new Date(); // Get the current date and time
  
    // Format the date and time components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Create the formatted date and time string
    const formattedDateTime = `${year}${month}${day}-${hours}${minutes}${seconds}`;
  
    // Append the random number to the formatted date and time
    const orderId = `ARENE-${formattedDateTime}-${randomNumber}`;
  
    return orderId;
  };
  useEffect(() => {
    // Fetch coupon data from Firestore
    const db = firebase.firestore();
    const couponRef = db.collection("Coupan");

    couponRef
      .get()
      .then((querySnapshot) => {
        const coupons = [];
        querySnapshot.forEach((doc) => {
          coupons.push({ ...doc.data(), id: doc.id });
        });

        setCouponData(coupons);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
        setLoading(false);
      });
  }, []);

  const applyCoupon = (couponCode) => {
    // Check if couponData is loaded
    if (!couponData || couponData.length === 0) {
      toast.error('Coupons are not loaded yet. Please wait.');
      return getPaymentAmount(); // Return current payment amount
    }
  
    const coupon = couponData.find((coupon) => coupon.code === couponCode);
  
    if (coupon) {
      const currentDate = dayjs().format('YYYY-MM-DD');
      const expiryDate = dayjs(coupon.expirydate).format('YYYY-MM-DD');
  
      if (dayjs(currentDate).isBefore(expiryDate)) {
        // Calculate discounted price (10% off)
        const discountPercentage = 0.10;
        let basePrice = 0;
  
        if (paymentOption === 'oneday') {
          basePrice = 500;
        } else if (paymentOption === 'threeday') {
          basePrice = 1000;
        } else {
          basePrice = getPaymentAmount(); // fallback to current payment amount
        }
  
        const discountAmount = basePrice * discountPercentage;
        const discountedPrice = basePrice - discountAmount;
  
        setAppliedCoupon(coupon);
        toast.success(`Coupon ${coupon.code} applied successfully!`);
        return discountedPrice;
      } else {
        toast.error(`Coupon ${coupon.code} has expired!`);
      }
    } else {
      toast.error('Invalid coupon code!');
    }
  
    return getPaymentAmount();
  };

  const submitBookingData = async (paymentAmount) => {
    try {
      setLoading(true);
      const currentDate = new Date().toISOString().slice(0, 10);
      let oneday = paymentOption === 'oneday';
      let threeday = paymentOption === 'threeday';
      let allday = paymentOption === 'allday';
      const orderId = generateOrderId();
      await firebase.firestore().collection('bookings').add({
        Name: name,
        orderId: orderId,
        address: address,
        phoneNumber: mobilenumber,
        email: email,
        Propertyname: Name,
        Location: location,
        roomType: roomType,
        roomprice: roomprice,
        Agentid: Agentid,
        Userid: user.uid,
        OrderDate: currentDate,
        Payment: paymentAmount,
        oneday: oneday,
        threeday: threeday,
        allday: allday,
        totalpayment: roomprice,
        bookingDate: {
          checkInDate: checkInDate,
        },
      });
      setLoading(false);
      router.push(`/bookingdetails?orderId=${orderId}`);
      toast.success('Booking Successful!');
    } catch (error) {
      console.error('Error submitting booking data:', error);
      toast.error('Failed to submit booking data. Please try again later.');
    }
  };

  const initiatePayment = async () => {
    if (!name || !email || !mobilenumber || !address) {
      toast.error('Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      let paymentAmount = getPaymentAmount();

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        toast.error('Failed to load Razorpay SDK. Please try again later.');
        return;
      }

      const amountInPaise = paymentAmount * 100;

      const options = {
        key: 'rzp_test_td8CxckGpxFssp',
        currency: 'INR',
        amount: amountInPaise,
        name: 'Arene Services',
        description: 'Thanks for purchasing',
        image: 'https://www.areneservices.in/public/front/images/property-logo.png',
        handler: async function (response) {
          console.log('Payment Successful:', response);
          await submitBookingData(paymentAmount);
          await axios.post('/api/sendEmail', {
            Name,
            roomType,
            roomprice,
            location,
            email,
            name,
            checkInDate
          });
          await axios.post('/api/sendMessage', {
            Name,
            roomType,
            roomprice,
            location,
            email,
            name,
            phoneNumber,
            checkInDate
          });
        },
        prefill: {
          name: name,
          email: email,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentAmount = () => {
    let paymentAmount;
  
    // Set base price based on payment option
    if (paymentOption === 'oneday') {
      paymentAmount = 500;
    } else if (paymentOption === 'threeday') {
      paymentAmount = 1000;
    } else {
      paymentAmount = roomprice || 0; // Fallback to room price if 'allday' or unspecified
    }
  
    // Include donation if selected
    if (includeDonation) {
      paymentAmount += 1;
    }
  
    // Apply coupon discount if valid coupon applied
    if (appliedCoupon && typeof appliedCoupon.discountAmount === 'number') {
      const discountedPrice = paymentAmount - appliedCoupon.discountAmount;
      paymentAmount = discountedPrice > 0 ? discountedPrice : 0; // Ensure payment amount doesn't go below zero
    }
  
    return paymentAmount;
  };
  
  


  return (
    <div>
      {loading ? (
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
      ) : (
      <div class="font-[sans-serif] bg-white mt-20 p-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">Checkout</h2>
        </div>
        <div class="mt-12">
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <h3 class="text-xl font-bold text-[#333]">01</h3>
              <h3 class="text-xl font-bold text-[#333]">Personal Details</h3>
            </div>
            <div class="md:col-span-2">
            <form>
  <div class="grid mb-4 sm:grid-cols-2 gap-5">
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      type="text" 
      placeholder="Enter name"
      class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" 
    />
   
    <input 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      type="email" 
      placeholder="Email address"
      class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" 
    />
    <input 
      value={mobilenumber} 
      onChange={(e) => setMobileNumber(e.target.value)} 
      type="number" 
      placeholder="Phone number"
      class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" 
    />
  

  </div>
  <textarea 
      value={address} 
      onChange={(e) => setAddress(e.target.value)} 
      placeholder="Address"
      class="px-4 py-3.5 bg-white text-[#333] w-full h-24 text-sm border-2 rounded-md focus:border-blue-500 outline-none resize-none"
    ></textarea>
</form>

            </div>
          </div>
          <div class="grid md:grid-cols-3 gap-6 mt-12">
    <div class="col-span-1">
        <h3 class="text-xl font-bold text-[#333]">02</h3>
        <h3 class="text-xl font-bold text-[#333]">Booking Summary</h3>
    </div>
    <div class="col-span-2">
        <div class="flex flex-wrap items-start pb-4 mb-10 border-b border-gray-200 dark:border-gray-700">
            <div class="w-full px-4 mb-4 md:w-1/2">
                <p class="mb-1 text-sm font-semibold leading-5 text-gray-600 dark:text-gray-400">Name:</p>
                <p class="text-base leading-6 text-gray-800 dark:text-gray-400">{Name}</p>
            </div>
            <div class="w-full px-4 mb-4 md:w-1/2">
                <p class="mb-1 text-sm font-semibold leading-5 text-gray-600 dark:text-gray-400">Location:</p>
                <p class="text-base leading-6 text-gray-800 dark:text-gray-400">{location}</p>
            </div>
            <div class="w-full px-4 mb-4 md:w-1/2">
                <p class="mb-1 text-sm font-semibold leading-5 text-gray-600 dark:text-gray-400">Type:</p>
                <p class="text-base leading-6 text-blue-600 dark:text-gray-400">{roomType}</p>
            </div>
            <div class="w-full px-4 mb-4 md:w-1/2">
                <p class="mb-1 text-sm font-semibold leading-5 text-gray-600 dark:text-gray-400">Price:</p>
                <p class="text-base leading-6 text-gray-800 dark:text-gray-400">Rs.{roomprice}</p>
            </div>
            <div class="w-full px-4 mb-4 md:w-1/2">
                <p class="mb-1 text-sm font-semibold leading-5 text-gray-600 dark:text-gray-400">Check In at:</p>
                <p class="text-base leading-6 text-gray-800 dark:text-gray-400">{checkInDate}</p>
            </div>
        </div>
    </div>
</div>

          <div class="grid md:grid-cols-3 gap-6 mt-12">
            <div>
              <h3 class="text-xl font-bold text-[#333]">03</h3>
              <h3 class="text-xl font-bold text-[#333]">Payment method</h3>
            </div>
            <div class="md:col-span-2">
           
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="flex items-center">
                  <input class="w-5 h-5 cursor-pointer"  type="radio" id="oneday" name="paymentOption" value="oneday" onChange={(e) => setPaymentOption(e.target.value)} />
                  <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                  Pay only 500 for one day
                  </label>
                </div>
                <div class="flex items-center">
                  <input type="radio" id="threeday" name="paymentOption" value="threeday" onChange={(e) => setPaymentOption(e.target.value)}  class="w-5 h-5 cursor-pointer"  />
                  <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                  Pay only 1000 for three days
                  </label>
                </div>
                {/* <div class="flex items-center">
                  <input type="radio" id="allday" name="paymentOption" value="allday" onChange={(e) => setPaymentOption(e.target.value)}  class="w-5 h-5 cursor-pointer"  />
                  <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                  Full Payment {roomprice}
                  </label>
                </div> */}
              </div>
              <div className="mb-4 flex mt-4">
            <input
              type="checkbox"
              checked={includeDonation}
              onChange={(e) => setIncludeDonation(e.target.checked)}
              className="mr-2"
            />
            <span>Add 1 rupee to donate</span>
          </div>
          <div class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
  <div class="relative w-full">
    <input 
      type="text" 
      value={couponCode} 
      onChange={(e) => setCouponCode(e.target.value)} 
      placeholder='ENTER COUPON CODE' 
      class="w-full bg-transparent border border-gray-800 rounded-xl text-md font-semibold text-gray-800 px-2 py-1 pr-16"
    />
   {!appliedCoupon ? (
                <button
                onClick={() => applyCoupon(couponCode)} 
                  className="absolute right-4 top-0 mt-1 mr-1 bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Apply
                </button>
              ) : (
                <div className="absolute right-4 top-0 mt-1 mr-1 bg-green-500 text-white px-3 py-1 rounded">
                  Applied
                </div>
              )}
  </div>
</div>


            </div>
          </div>
          <div class="flex flex-wrap justify-end gap-4 mt-12">
          {/* <button type="button" class="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100">
  Estimated Total : ₹ {paymentOption ? (paymentOption === 'oneday' ? 500 : (paymentOption === 'threeday' ? 1000 : roomprice)) : roomprice}
</button> */}

<button onClick={initiatePayment} 
      className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
     Pay Now ₹{getPaymentAmount()}
    </button>
          </div>
        </div>
      </div>
    </div>
      )}
    <ToastContainer/>
    </div>
  )
}

export default Test