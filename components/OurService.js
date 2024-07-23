import React from 'react'

const OurService = () => {
  return (
    <div> <section>
    <div className="max-w-[90%] lg:max-w-[85%] mx-auto my-8 md:my-12 lg:my-20">
        <div className="text-center">
            <p className='text-[#43d3b1] font-mono'>OUR SERVICES</p>
            <p className="text-3xl font-semibold font-mono">What We Do?</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                <div className='hover:bg-color3 px-4 py-8 rounded-lg duration-200'>
                    <div className='h-[80px] w-full'>
                        <img src="/icon/buy.png" alt="" className='h-full w-full object-contain' />
                    </div>
                    <p className='text-2xl font-semibold mt-4 font-mono'>Sell A Property</p>
                    <p className='text-gray-500 text-sm mt-2 mb-6 font-mono'>Showcasing your property's best features for a successful sale.</p>
                    <a href="/signin" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200 font-mono' >Sell Property</a>
                </div>
                <div className='bg-color3 px-4 py-8 rounded-lg duration-200'>
                    <div className='h-[80px] w-full'>
                        <img src="/icon/rent.png" alt="" className='h-full w-full object-contain' />
                    </div>
                    <p className='text-2xl font-semibold mt-4 font-mono'>Rent A Property</p>
                    <p className='text-gray-500 text-sm mt-2 mb-6 font-mono'>Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                    <a href="/signin" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200 font-mono' >Rent Property</a>
                </div>
                <div className='hover:bg-color3 px-4 py-8 rounded-lg duration-200'>
                    <div className='h-[80px] w-full'>
                        <img src="chef.png" alt="" className='h-full w-full object-contain' />
                    </div>
                    <p className='text-2xl font-semibold mt-4 font-mono'>Join as Chef Vendor</p>
                    <p className='text-gray-500 text-sm mt-2 mb-6 font-mono'>Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                    <a href="/AreneChefVendor/loginregister" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200 font-mono' >Join Now</a>
                </div>
                <div className='bg-color3 px-4 py-8 rounded-lg duration-200'>
                    <div className='h-[80px] w-full'>
                        <img src="laundry.png" alt="" className='h-full w-full object-contain' />
                    </div>
                    <p className='text-2xl font-semibold mt-4 font-mono'>Join as Laundry Vendor</p>
                    <p className='text-gray-500 text-sm mt-2 mb-6 font-mono'>Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                    <a href="/ArenelaundryVendor/loginregister" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200 font-mono' >Rent Property</a>
                </div>
                <div className='bg-color3 px-4 py-8 rounded-lg duration-200'>
                    <div className='h-[80px] w-full'>
                    </div>
                    <p className='text-2xl font-semibold mt-4 font-mono'>Join as Delivery Partner</p>
                    <p className='text-gray-500 text-sm mt-2 mb-6 font-mono'>Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                    <a href="Deliveryboy/loginregister" className='border border-black py-2 px-4 rounded-btn hover:bg-[#43d3b1] hover:text-white hover:border-[#43d3b1] duration-200 font-mono' >Rent Property</a>
                </div>
                <div className=' px-4 py-8 rounded-lg duration-200'>
                <div class="overflow-hidden relative w-56 h-64 bg-gray-50 rounded-2xl text-sky-400 flex flex-col justify-end items-center gap-2">
  <svg class="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
    <path class="svg-stroke-primary" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
    </path>
  </svg>
  <div class="flex flex-col items-center">
    <p class="text-xl font-extrabold">Discount</p>
    <p class="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-sky-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-sky-200 before:w-12 before:h-0.5">Up to</p>
  </div>
  <span class="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">70%</span>
  <button class="z-10 px-4 py-2 bg-sky-400 text-gray-50 hover:bg-sky-300 font-mono">COPY CODE</button>
  <p class="text-xs mb-1">*Variable prices</p>
</div>
                </div>
               
            </div>
        </div>
    </div>
</section></div>
  )
}

export default OurService