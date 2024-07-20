import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import { useState } from 'react';
// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer/Footer"

function Home() {
    const splide = {
        type: 'loop',
        focus: 'center',
        perPage: 1,
        autoplay: false,
        autoWidth: true,
        height: '220px',
        gap: '2rem',
        autoStart: true,
        autoScroll: {
            pauseOnHover: true,
        },
        pagination: false,
        arrows: false,
    }
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  

    return (
        <>
            {/* <Navbar /> */}
            <main>
            <section id="hero" className="relative h-[430px] mt-16">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    style={{ objectFit: 'cover' }} // Ensures the video covers the entire area without being cut off
    src="home.mp4"
    autoPlay
    loop
    muted
  />
  <div className="relative z-10 max-w-[90%] lg:max-w-[85%] mx-auto grid place-content-center h-full">
    <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8 place-content-center">
      <div>
        <h1 className='text-4xl font-bold font-mono text-center text-white mt-8'>Find your perfect property</h1>
      </div>
      <div>
      <div>
      <div role="tablist" className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-8 border-b border-gray-300">
        {/* Tab Buttons */}
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab1' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab1')}
        >
          ARENE PG
        </button>
        <button
          className={`flex-1 p-1 text-[12px] font-mono font-bold font-bold text-center ${activeTab === 'tab2' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab2')}
        >
          BUY PROPERTY
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab3' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab3')}
        >
          RENT PROPERTY
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab4' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab4')}
        >
         ARENE HOTEL
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab5' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab5')}
        >
          BANQUEET HALL
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab6' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab6')}
        >
          RESORT
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab7' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab7')}
        >
          ARENE LAUNDRY
        </button>
        <button
          className={`flex-1 p-1 text-xs font-mono font-bold text-center ${activeTab === 'tab8' ? 'bg-[#43d3b1] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTabChange('tab8')}
        >
          ARENE CHEF
        </button>
      </div>


      {/* Tab Panels */}
      <div role="tabpanel" className={`tab-content ${activeTab === 'tab1' ? 'block' : 'hidden'} bg-base-100 border-base-300 rounded-b-md p-4`}>
        <div className="grid gap-2 grid-cols-1">
          <select className="border-b-2 border-[#43d3b1] text-xs p-1">
            <option hidden>PG category</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <input type="text" placeholder="Search location..." className="border-b-2 border-[#43d3b1] outline-none text-xs p-1" />
          <select className="border-b-2 border-[#43d3b1] text-xs p-1">
            <option value="Nearest location">Nearest location</option>
            <option value="2km">within 2 km</option>
            <option value="4km">within 4 km</option>
            <option value="6km">within 6 km</option>
            <option value="8km">within 8 km</option>
            <option value="10km">within 10 km</option>
          </select>
          <button className="bg-[#43d3b1] p-2 rounded-btn text-white text-xs">Search</button>
        </div>
      </div>

      <div role="tabpanel" className={`tab-content ${activeTab === 'tab2' ? 'block' : 'hidden'} bg-base-100 border-base-300 rounded-b-md p-4`}>
        <div className="grid gap-2 grid-cols-1">
          <select className="border-b-2 border-[#43d3b1] text-xs p-1">
            <option hidden>Category</option>
            <option value="">Apartment</option>
            <option value="">Builder floor</option>
            <option value="">Villa</option>
            <option value="">Land</option>
            <option value="">Shop/Showroom</option>
            <option value="">Office space</option>
            <option value="">Other</option>
          </select>
          <input type="text" placeholder="Search location..." className="border-b-2 border-[#43d3b1] outline-none text-xs p-1" />
          <select className="border-b-2 border-[#43d3b1] text-xs p-1">
            <option value="Nearest location">Nearest location</option>
            <option value="2km">within 2 km</option>
            <option value="4km">within 4 km</option>
            <option value="6km">within 6 km</option>
            <option value="8km">within 8 km</option>
            <option value="10km">within 10 km</option>
          </select>
          <button className="bg-[#43d3b1] p-2 rounded-btn text-white text-xs">Search</button>
        </div>
      </div>
    </div>
</div>

    </div>
  </div>
</section>

                <section>
                    <div className="max-w-[90%] lg:max-w-[85%] mx-auto my-8 md:my-12 lg:my-20">
                        <div className="flex flex-col lg:flex-row md:flex-row justify-between">
                            <div>
                                <p className="text-lg mb-2 text-[#43d3b1]">EXPLORE CITIES</p>
                                <p className="text-3xl font-semibold">Properties By Cities</p>
                            </div>
                            <div>
                                <a href="#" className="border-b-2 border-[#43d3b1] pb-1">View all Properties<i className="fa-solid fa-angle-right ms-1 text-[#43d3b1]"></i></a>
                            </div>
                        </div>
                        <div className="py-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                            <div className="flex gap-6 items-center bg-color3 rounded-lg overflow-hidden hover:bg-[#43d3b1] hover:!text-white duration-300">
                                <div className="h-36 w-44">
                                    <img className="w-full h-full object-cover" src="https://static.toiimg.com/img/100273065/Master.jpg" alt="" />
                                </div>
                                <div className="w">
                                    <p className="text-2xl font-semibold mb-2">Varanasi</p>
                                    <p className="mb-1">188 Properties</p>
                                    <a href="#" className="text-sm">Explore now<i className="fa-solid fa-angle-right ms-1 text-[#43d3b1]"></i></a>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center bg-color3 rounded-lg overflow-hidden hover:bg-[#43d3b1] hover:!text-white duration-300">
                                <div className="h-36 w-44">
                                    <img className="w-full h-full object-cover" src="https://static.toiimg.com/img/100273065/Master.jpg" alt="" />
                                </div>
                                <div className="w">
                                    <p className="text-2xl font-semibold mb-2">Mirzapur</p>
                                    <p className="mb-1">188 Properties</p>
                                    <a href="#" className="text-sm">Explore now<i className="fa-solid fa-angle-right ms-1 text-[#43d3b1]"></i></a>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center bg-color3 rounded-lg overflow-hidden hover:bg-[#43d3b1] hover:!text-white duration-300">
                                <div className="h-36 w-44">
                                    <img className="w-full h-full object-cover" src="https://static.toiimg.com/img/100273065/Master.jpg" alt="" />
                                </div>
                                <div className="w">
                                    <p className="text-2xl font-semibold mb-2">Jaunpur</p>
                                    <p className="mb-1">188 Properties</p>
                                    <a href="#" className="text-sm">Explore now<i className="fa-solid fa-angle-right ms-1 text-[#43d3b1]"></i></a>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center bg-color3 rounded-lg overflow-hidden hover:bg-[#43d3b1] hover:!text-white duration-300">
                                <div className="h-36 w-44">
                                    <img className="w-full h-full object-cover" src="https://static.toiimg.com/img/100273065/Master.jpg" alt="" />
                                </div>
                                <div className="w">
                                    <p className="text-2xl font-semibold mb-2">Balia</p>
                                    <p className="mb-1">188 Properties</p>
                                    <a href="#" className="text-sm">Explore now<i className="fa-solid fa-angle-right ms-1 text-[#43d3b1]"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="max-w-[90%] lg:max-w-[85%] mx-auto my-8 md:my-12 lg:my-20">
                        <div className="text-center">
                            <p className="text-lg mb-2 text-[#43d3b1]">FEATURED PROPERTIES</p>
                            <p className="text-3xl font-semibold">Recommended for you</p>
                        </div>
                        <div className="w-full md:w-full lg:w-2/3 mx-auto grid grid-cols-3 lg:grid-cols-6 md:grid-cols-6 place-items-center gap-8 text-lg mt-8">
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">View all</a>
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">Apartment</a>
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">Villa</a>
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">Studio</a>
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">House</a>
                            <a href="" className="px-4 py-2 bg-color3 font-medium rounded-lg hover:bg-[#43d3b1] hover:text-white duration-200">Office</a>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 my-10">
                            <div className="rounded-lg overflow-hidden border">
                                <div className="h-[240px] w-full">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f1/03/d9/dasashwamedh-ghat.jpg?w=1400&h=1400&s=1" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl font-semibold">Casa Lomas De Machalí Machas</p>
                                    <p className="mb-2"><i className="fa-solid fa-location-dot text-[#43d3b1] me-1"></i>Jaunpur, U.P.</p>
                                    <div className="flex gap-8 text-lg">
                                        <p><i className="fa-solid fa-bed me-2"></i>3</p>
                                        <p><i className="fa-solid fa-bath me-2"></i>3</p>
                                        <p><i className="fa-solid fa-ruler me-2"></i>3</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 border-t">
                                    <div className="flex gap-2 items-center">
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH" className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <p className="text-lg font-medium">John Wick</p>
                                    </div>
                                    <div>
                                        <p className="text-[24px] font-medium"><i className="fa-solid fa-indian-rupee-sign me-1"></i>15,000<span className="text-gray-400">/SQFT</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border">
                                <div className="h-[240px] w-full">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f1/03/d9/dasashwamedh-ghat.jpg?w=1400&h=1400&s=1" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl font-semibold">Casa Lomas De Machalí Machas</p>
                                    <p className="mb-2"><i className="fa-solid fa-location-dot text-[#43d3b1] me-1"></i>Jaunpur, U.P.</p>
                                    <div className="flex gap-8 text-lg">
                                        <p><i className="fa-solid fa-bed me-2"></i>3</p>
                                        <p><i className="fa-solid fa-bath me-2"></i>3</p>
                                        <p><i className="fa-solid fa-ruler me-2"></i>3</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 border-t">
                                    <div className="flex gap-2 items-center">
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH" className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <p className="text-lg font-medium">John Wick</p>
                                    </div>
                                    <div>
                                        <p className="text-[24px] font-medium"><i className="fa-solid fa-indian-rupee-sign me-1"></i>15,000<span className="text-gray-400">/SQFT</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border">
                                <div className="h-[240px] w-full">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f1/03/d9/dasashwamedh-ghat.jpg?w=1400&h=1400&s=1" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl font-semibold">Casa Lomas De Machalí Machas</p>
                                    <p className="mb-2"><i className="fa-solid fa-location-dot text-[#43d3b1] me-1"></i>Jaunpur, U.P.</p>
                                    <div className="flex gap-8 text-lg">
                                        <p><i className="fa-solid fa-bed me-2"></i>3</p>
                                        <p><i className="fa-solid fa-bath me-2"></i>3</p>
                                        <p><i className="fa-solid fa-ruler me-2"></i>3</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 border-t">
                                    <div className="flex gap-2 items-center">
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH" className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <p className="text-lg font-medium">John Wick</p>
                                    </div>
                                    <div>
                                        <p className="text-[24px] font-medium"><i className="fa-solid fa-indian-rupee-sign me-1"></i>15,000<span className="text-gray-400">/SQFT</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border">
                                <div className="h-[240px] w-full">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f1/03/d9/dasashwamedh-ghat.jpg?w=1400&h=1400&s=1" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl font-semibold">Casa Lomas De Machalí Machas</p>
                                    <p className="mb-2"><i className="fa-solid fa-location-dot text-[#43d3b1] me-1"></i>Jaunpur, U.P.</p>
                                    <div className="flex gap-8 text-lg">
                                        <p><i className="fa-solid fa-bed me-2"></i>3</p>
                                        <p><i className="fa-solid fa-bath me-2"></i>3</p>
                                        <p><i className="fa-solid fa-ruler me-2"></i>3</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 border-t">
                                    <div className="flex gap-2 items-center">
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH" className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <p className="text-lg font-medium">John Wick</p>
                                    </div>
                                    <div>
                                        <p className="text-[24px] font-medium"><i className="fa-solid fa-indian-rupee-sign me-1"></i>15,000<span className="text-gray-400">/SQFT</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border">
                                <div className="h-[240px] w-full">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f1/03/d9/dasashwamedh-ghat.jpg?w=1400&h=1400&s=1" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl font-semibold">Casa Lomas De Machalí Machas</p>
                                    <p className="mb-2"><i className="fa-solid fa-location-dot text-[#43d3b1] me-1"></i>Jaunpur, U.P.</p>
                                    <div className="flex gap-8 text-lg">
                                        <p><i className="fa-solid fa-bed me-2"></i>3</p>
                                        <p><i className="fa-solid fa-bath me-2"></i>3</p>
                                        <p><i className="fa-solid fa-ruler me-2"></i>3</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 border-t">
                                    <div className="flex gap-2 items-center">
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH" className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <p className="text-lg font-medium">John Wick</p>
                                    </div>
                                    <div>
                                        <p className="text-[24px] font-medium"><i className="fa-solid fa-indian-rupee-sign me-1"></i>15,000<span className="text-gray-400">/SQFT</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="#" className="text-lg font-semibold bg-[#43d3b1] text-white p-4 rounded-btn hover:shadow-lg duration-200">View all properties</a>
                        </div>
                    </div>
                </section>
                <section className="bg-color2 text-white">
                    <div className="max-w-[90%] lg:max-w-[85%] mx-auto py-20">
                        <div className="text-center">
                            <p>PROPERTY TYPE</p>
                            <p className="text-3xl font-semibold">Try Searching For</p>
                        </div>
                        <div className='mt-10'>
                            <Splide options={splide} extensions={{ AutoScroll }} aria-label="Client Images">
                                <SplideSlide>
                                    <a href="#" className='bg-color1 block p-8 rounded-lg text-center hover:bg-[#43d3b1] duration-200'>
                                        <div className='mb-4'>
                                            <i className="fa-solid fa-house me-2 text-4xl text-[#43d3b1] bg-white p-4 rounded-full"></i>
                                        </div>
                                        <p className='text-2xl mb-2'>Apartment</p>
                                        <p>234 property</p>
                                    </a>
                                </SplideSlide>
                                <SplideSlide>
                                    <a href="#" className='bg-color1 block p-8 rounded-lg text-center hover:bg-[#43d3b1] duration-200'>
                                        <div className='mb-4'>
                                            <i className="fa-solid fa-house me-2 text-4xl text-[#43d3b1] bg-white p-4 rounded-full"></i>
                                        </div>
                                        <p className='text-2xl mb-2'>Apartment</p>
                                        <p>234 property</p>
                                    </a>
                                </SplideSlide>
                                <SplideSlide>
                                    <a href="#" className='bg-color1 block p-8 rounded-lg text-center hover:bg-[#43d3b1] duration-200'>
                                        <div className='mb-4'>
                                            <i className="fa-solid fa-house me-2 text-4xl text-[#43d3b1] bg-white p-4 rounded-full"></i>
                                        </div>
                                        <p className='text-2xl mb-2'>Apartment</p>
                                        <p>234 property</p>
                                    </a>
                                </SplideSlide>
                                <SplideSlide>
                                    <a href="#" className='bg-color1 block p-8 rounded-lg text-center hover:bg-[#43d3b1] duration-200'>
                                        <div className='mb-4'>
                                            <i className="fa-solid fa-house me-2 text-4xl text-[#43d3b1] bg-white p-4 rounded-full"></i>
                                        </div>
                                        <p className='text-2xl mb-2'>Apartment</p>
                                        <p>234 property</p>
                                    </a>
                                </SplideSlide>
                                <SplideSlide>
                                    <a href="#" className='bg-color1 block p-8 rounded-lg text-center hover:bg-[#43d3b1] duration-200'>
                                        <div className='mb-4'>
                                            <i className="fa-solid fa-house me-2 text-4xl text-[#43d3b1] bg-white p-4 rounded-full"></i>
                                        </div>
                                        <p className='text-2xl mb-2'>Apartment</p>
                                        <p>234 property</p>
                                    </a>
                                </SplideSlide>

                            </Splide>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="max-w-[90%] lg:max-w-[85%] mx-auto my-8 md:my-12 lg:my-20">
                        <div className="text-center">
                            <p className='text-[#43d3b1]'>OUR SERVICES</p>
                            <p className="text-3xl font-semibold">What We Do?</p>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                                <div className='hover:bg-color3 px-4 py-8 rounded-lg duration-200'>
                                    <div className='h-[80px] w-full'>
                                        <img src="/icon/buy.png" alt="" className='h-full w-full object-contain' />
                                    </div>
                                    <p className='text-2xl font-semibold mt-4'>Buy A New Home</p>
                                    <p className='text-gray-500 text-sm mt-2 mb-6'>Explore diverse properties and expert guidance for a seamless buying experience.</p>
                                    <a href="#" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200' >Find a home</a>
                                </div>
                                <div className='bg-color3 px-4 py-8 rounded-lg duration-200'>
                                    <div className='h-[80px] w-full'>
                                        <img src="/icon/rent.png" alt="" className='h-full w-full object-contain' />
                                    </div>
                                    <p className='text-2xl font-semibold mt-4'>Rent A Home</p>
                                    <p className='text-gray-500 text-sm mt-2 mb-6'>Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                                    <a href="#" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200' >Find a home</a>
                                </div>
                                <div className='hover:bg-color3 px-4 py-8 rounded-lg duration-200'>
                                    <div className='h-[80px] w-full'>
                                        <img src="/icon/sale.png" alt="" className='h-full w-full object-contain' />
                                    </div>
                                    <p className='text-2xl font-semibold mt-4'>Sell A Home</p>
                                    <p className='text-gray-500 text-sm mt-2 mb-6'>Showcasing your property's best features for a successful sale.</p>
                                    <a href="#" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200' >Find a home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[90%] lg:max-w-[85%] mx-auto my-20 bg-color3 rounded-lg overflow-hidden'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                            <div>
                                <div className='h-[300px] w-full'>
                                    <img src="https://static.wanderon.in/wp-content/uploads/2024/04/photography-spots-in-varanasi.jpg" className='h-full w-full object-cover' alt="" />
                                </div>
                                <div className='bg-color2 text-white p-8'>
                                    <p className='mb-6'>Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
                                    <a href="" className='bg-[#43d3b1] text-white px-4 py-2 rounded-btn'>View all</a>
                                </div>
                            </div>
                            <div className='grid place-content-center col-span-2 p-8'>
                                <div>
                                    <p className='text-xl font-medium text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quo voluptatum officia? Et aliquid consectetur quia soluta repudiandae, beatae tempora expedita, deleniti, dolor asperiores vel voluptas! Tempore atque nobis a minus quae fugit, minima, non vitae ipsam repellat dolores mollitia.</p>
                                </div>
                                <div className='flex justify-center items-center gap-2 mt-6'>
                                    <img src="https://getimagehub.com/wp-content/uploads/2023/12/Girls-Whatsapp-DP-with-iphone.webp" className='h-10 w-10 object-cover rounded-full' alt="" />
                                    <p className='text-xl font-semibold'>John Wick</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Home
