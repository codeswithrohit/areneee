import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaCamera, FaHeart, FaStar, FaBed, FaBath, FaHome, FaSms, FaPhone } from 'react-icons/fa';
import { FaPersonCircleCheck } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import AddRent from './Rent/AddRent';
import AgentNav from '../../components/AgentNav';
const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user);
      } else {
        setUser(null);
        setUserData(null);
        router.push('/signin'); // Redirect to the login page if the user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

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
      setIsLoading(false);
    }
  };


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editData, setEditData] = useState({
    imgSrc: [],
    videoSrc: null,
    subcat: '',
    description: '',
    Owner: '',
    category: '',
    location: '',
    Propertyname: '',
    benefits: [],
    propertytypes: [],
  });






  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };







  const [showAllInputFormats, setShowAllInputFormats] = useState(false);
  const handleShowAllInputFormats = () => {
    setShowAllInputFormats(true);
  };

  const handleCloseAllInputFormats = () => {
    setShowAllInputFormats(false);
  };

  const [propertydata, setPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const db = firebase.firestore();
          const galleryRef = db.collection('rentdetail').where('AgentId', '==', user.uid);
          const snapshot = await galleryRef.get();
          const data = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setPropertyData(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
    };

    fetchData();
  }, [user]);


  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEditImageChange = (e) => {
    const images = Array.from(e.target.files);
    setEditData({ ...editData, imgSrc: [...editData.imgSrc, ...images] });
  };

  const handleEditVideoChange = (e) => {
    const video = e.target.files[0];
    setEditData({ ...editData, videoSrc: video });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditPropertyTypechange = (index, event) => {
    const { name, value } = event.target;
    const updatedpropertytypes = [...editData.propertytypes];
    updatedpropertytypes[index][name] = value;
    setEditData({ ...editData, propertytypes: updatedpropertytypes });
  };

  const handleEditPropertyType = () => {
    const updatedpropertytypes = [...editData.propertytypes, { type: '', availability: '', price: '' }];
    setEditData({ ...editData, propertytypes: updatedpropertytypes });
  };

  const handleEdit = (id) => {
    const selectedData = propertydata.find((item) => item.id === id);
    setEditData({
      imgSrc: selectedData.imgSrc,
      videoSrc: selectedData.videoSrc,
      subcat: selectedData.subcat,
      description: selectedData.description,
      Owner: selectedData.Owner,
      category: selectedData.category,
      Propertyname: selectedData.Propertyname,
      benefits: selectedData.benefits || [],
      propertytypes: selectedData.propertytypes,
    });

    setSelectedBenefits(selectedData.benefits || []);
    setIsEditing(true);
    setEditId(id);
  };

  const handleBenefitChange = (e) => {
    const { name } = e.target;
    setSelectedBenefits((prevBenefits) =>
      prevBenefits.includes(name)
        ? prevBenefits.filter((benefit) => benefit !== name)
        : [...prevBenefits, name]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storageRef = firebase.storage().ref();

      // Uploading images
      const imageUrls = [];
      for (const image of editData.imgSrc) {
        if (typeof image === 'object') {
          const imageRef = storageRef.child(image.name);
          await imageRef.put(image);
          const url = await imageRef.getDownloadURL();
          imageUrls.push(url);
        } else {
          imageUrls.push(image);
        }
      }

      // Uploading video
      let videoUrl = editData.videoSrc;
      if (typeof editData.videoSrc === 'object') {
        const videoRef = storageRef.child(editData.videoSrc.name);
        await videoRef.put(editData.videoSrc);
        videoUrl = await videoRef.getDownloadURL();
      }

      const dataWithImageUrls = { ...editData, imgSrc: imageUrls, videoSrc: videoUrl, benefits: selectedBenefits, };

      const db = firebase.firestore();
      await db.collection('rentdetail').doc(editId).update(dataWithImageUrls);

      toast.success('Update successful!', {
        position: toast.POSITION.TOP_CENTER,
      });
      window.location.reload();
      setEditData({
        imgSrc: [],
        videoSrc: null,
        subcat: '',
        description: '',
        Owner: '',
        category: '',
        Propertyname: '',
        propertytypes: [],
      });
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Update failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
      setEditId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('rentdetail').doc(id).delete();
      const updatedData = propertydata.filter((item) => item.id !== id);
      setPropertyData(updatedData);
      toast.success('Deletion successful!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast.error('Deletion failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };





  return (
    <div className=''>
      <AgentNav />
      <div className="mt-24">
        {isLoading ? ( // Display loading message while isLoading is true
          <div className="flex justify-center items-center h-screen">
            <button type="button"
              className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#43d3b0] hover:bg-orange-700 active:bg-[#43d3b0]">
              Loading
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin"
                viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.414.038A8.973 8.973 0 0 1 21 12a9 9 0 0 1-5.068 8.098 1 1 0 0 1-.707 1.864l-3.5-1a1 1 0 0 1-.557-1.517l2-3a1 1 0 0 1 1.664 1.11l-.755 1.132a7.003 7.003 0 0 0 3.006-11.5 1 1 0 0 1 .039-1.413z"
                  clipRule="evenodd" data-original="#000000" />
              </svg> {/* You can replace this with any loading spinner component or element */}
            </button>
          </div>
        ) : (
          <div className=" text-center p-8 bg-white dark:bg-white">
            {isEditing ? (
              // Display the edit form when isEditing is true
              <div>
                <form onSubmit={handleUpdate} className=" flex flex-wrap justify-center gap-4">
                  <button onClick={() => setIsEditing(false)} className="w-full p-2 bg-red-500 text-white rounded-md">
                    Cancel
                  </button>
                  {/* Rest of the form */}
                  <div className="flex flex-wrap justify-center gap-4 w-full">
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                      <div className="flex w-full gap-4">
                        <div className="w-1/2">
                          <label className="w-full">
                            Upload Property Photos:
                            <input type="file" accept="image/*" multiple onChange={handleEditImageChange} className="w-full p-2 border border-gray-300 rounded-md" />
                          </label>
                        </div>
                        <div className="w-1/2">
                          <label className="w-full">
                            Upload Property Video:
                            <input type="file" accept="video/*" onChange={handleEditVideoChange} className="w-full p-2 border border-gray-300 rounded-md" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full gap-4">
                      <div className="w-1/2">
                      <div className="w-full">
                            <select
                              name="subcat"
                              value={editData.subcat}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Property Type</option>
                              <option value="Appartment">Apartment</option>
                              <option value="Builder Floor">Builder Floor</option>
                              <option value="Shop/Showroom">Shop/Showroom</option>
                              <option value="Office Space">Office Space</option>
                              <option value="Other Properties">Other Properties</option>
                            </select>
                          </div>
                      </div>

                      <div className="w-1/2">
                        <input
                          type="text"
                          name="Owner"
                          value={editData.Owner}
                          onChange={handleEditChange}
                          placeholder="Room Owner Name"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="flex w-full gap-4">
                      <div className="w-1/2">
                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >

                          <option value="Rent">Rent</option>
                        </select>
                      </div>
                      <div className="w-1/2">

                        <input
                          type="text"
                          name="Propertyname"
                          value={editData.Propertyname}
                          onChange={handleEditChange}
                          placeholder="Property Name"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className='w-full' >
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="4" // This attribute controls the number of visible text lines for the textarea
                      ></textarea>
                    </div>
                    <h2 class="text-md font-bold  text-gray-900">Select Benifits</h2>
                    <div className="  grid grid-cols-1 lg:grid-cols-4 gap-4 p-10 mt-16">
                      {['Food', 'Laundry', 'Parking', 'WiFi', '24/7 Security', 'Aquaguard'].map((benefit) => (
                        <div key={benefit} className="relative flex w-60 items-center rounded bg-gray-50 py-2 px-4 pl-14 font-medium text-gray-700">
                          <input
                            id={benefit}
                            className="peer hidden"
                            type="checkbox"
                            name={benefit} // Use `benefit` directly
                            checked={selectedBenefits.includes(benefit)} // Check if `benefit` is in `selectedBenefits`
                            onChange={handleBenefitChange}
                          />
                          <label className="absolute left-0 top-0 h-full w-full cursor-pointer rounded border peer-checked:border-blue-600 peer-checked:bg-blue-100" htmlFor={benefit}></label>
                          <div className="absolute left-4 h-3 w-3 rounded border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2"></div>
                          <span className="pointer-events-none z-10 ml-4">{benefit}</span>
                        </div>
                      ))}

                    </div>
                    {editData.propertytypes.map((propertytype, index) => (
                      <div key={index} className="flex flex-wrap justify-center gap-4 w-full">
                        <input
                          type="text"
                          name="type"
                          value={propertytype.type}
                          onChange={(e) => handleEditPropertyTypechange(index, e)}
                          placeholder="Room Type"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          name="availability"
                          value={propertytype.availability}
                          onChange={(e) => handleEditPropertyTypechange(index, e)}
                          placeholder="Availability"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          name="price"
                          value={propertytype.price}
                          onChange={(e) => handleEditPropertyTypechange(index, e)}
                          placeholder="Price"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}

                    <button type="button" onClick={handleEditPropertyType} className="w-full p-2 bg-blue-500 text-white rounded-md">
                      Add Property Type
                    </button>
                    {/* Add similar input fields for other data */}
                  </div>
                  <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                </form>
              </div>) : showAllInputFormats ? (
                <AddRent handleCloseAllInputFormats={handleCloseAllInputFormats} />
              ) : (
              // Display the add PG Detail button when isEditing is false and showAllInputFormats is false
              <div className="flex justify-end">
                <button onClick={handleShowAllInputFormats} className="w-36 font-bold  p-2 bg-blue-500 text-white rounded-md">
                  <span className='text-2xl font-bold' >+</span>  Add Property
                </button>
              </div>
            )}
            <div>
              {propertydata.length > 0 ? (
                <div className=" flex flex-wrap justify-center">
                  <div className=" p-16 bg-white grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {propertydata
                      .map((item, index) => (
                        <div key={item.id} className="relative mx-auto w-full">
                          <Link
                            href={`/rentdetail?id=${item.id}`}
                            className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
                          >
                            <div className="rounded-lg bg-white p-4 shadow">
                              <div className="relative flex justify-center overflow-hidden rounded-lg">
                                <Carousel showThumbs={false} autoPlay>
                                  {item.imgSrc.map((image, index) => (
                                    <div key={index}>
                                      <img
                                        src={image}
                                        alt={`Image ${index}`}
                                        className='h-48 w-196'
                                      />
                                    </div>
                                  ))}
                                </Carousel>
                              </div>

                              <div className="mt-4 text-start">
                                <h2 className="line-clamp-1   text-xl font-medium text-gray-800 md:text-sm" title="location">
                                  {item.location}
                                </h2>

                                <p className="text-primary  mt-2  rounded-xl font-semibold ">
                                  <span className="text-xs">{item.Propertyname}</span>
                                </p>
                                <p className="text-primary text-sm mt-2 font-semibold">
  {item.Verified === 'true' ? 'Verified' : 'Verification Under Process'}
</p>
                              </div>
                             
                            </div>
                          </Link>
                          <div className="flex items-center justify-between mt-4">

                            <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                              Edit
                            </button>


                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                              Delete
                            </button>

                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-2xl text-gray-600">No Data</p>
                </div>
              )}
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
