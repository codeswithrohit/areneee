import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { FaHome, FaClipboardList, FaUser } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostPropertyNav = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const navigateTo = (path) => {
    if (userData && !userData.verified) {
      toast.error('Your account is currently under verification. Please allow up to 24 business hours for verification to complete');
      return;
    }
    router.push(`/PostProperty${path}`);
  };

  const navigate = (path) => {
    router.push(`/PostProperty${path}`);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        fetchUserData(user);
      } else {
        setUser(null);
        setUserData(null);
        router.push('/PostProperty/Register'); // Redirect to the login page if the user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) {
      return; // No need to fetch user data while loading
    }
    // Fetch user data after authentication is done
    fetchUserData(user);
  }, [loading, user]);

  const fetchUserData = async (user) => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', user.uid); // Update the path to the user document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
          setUserData(userData);
      } else {
        router.push('/signin');
        // Handle case where user data doesn't exist in Firestore
        // You can create a new user profile or handle it based on your app's logic
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

 

  const [menuState, setMenuState] = useState(false);

  const navigation = [
    { title: "Sell Property", path: "/addbuydata" },
    { title: "Rent Property", path: "/addrent" },
    { title: "PG", path: "/addpg" },
    { title: "Hotel", path: "/addhotel" },
    { title: "Banqueet Hall", path: "/addbanqueethall" },
    { title: "Resort", path: "/addresort" },
    // { title: "Laundry", path: "/Laundry" },
  ];

  return (
    <div>
      <ToastContainer />
      <div className='fixed top-0 w-full z-30 '>
        <nav className="bg-white border-b">
          <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
            <div className="flex-none lg:flex-initial">
              <a href="/">
                <img
                  src="https://www.areneservices.in/public/front/images/property-logo.png"
                  width={80}
                  height={30}
                  alt="logo"
                />
              </a>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {
                    navigation.map((item, idx) => (
                      <li key={idx} className=" p-2 ">
                        <a className='text-[#43d3b0] cursor-pointer font-bold hover:white' onClick={() => navigateTo(item.path)}>
                          {item.title}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                <button
                  className="outline-none text-gray-400 block lg:hidden"
                  onClick={() => setMenuState(!menuState)}
                >
                  {
                    menuState ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className='fixed bottom-0 w-full bg-white shadow-md z-30'>
        <ul className='flex justify-around font-sans'>
          <li
            className={`flex flex-col items-center justify-center font-bold w-full text-[15px] py-3.5 cursor-pointer ${
              router.pathname === '/PostProperty' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => navigate('')}
          >
            <FaHome className='w-6 h-6 mb-1' />
            Home
          </li>
          <li
            className={`flex flex-col items-center justify-center font-bold w-full text-[15px] py-3.5 cursor-pointer ${
              router.pathname.startsWith('/PostProperty/Orders') ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => navigate('/Orders')}
          >
            <FaClipboardList className='w-6 h-6 mb-1' />
            Orders
          </li>
          {/* <li
            className={`flex flex-col items-center justify-center font-bold w-full text-[15px] py-3.5 cursor-pointer ${
              router.pathname.startsWith('/PostProperty/Profile') ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => navigate('/Profile')}
          >
            <FaUser className='w-6 h-6 mb-1' />
            Profile
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default PostPropertyNav;
