import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*--Left Section---*/}
            <div>
            <img className='mb-5 w-40' src={assets.logo} alt=''/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>A doctor's appointment system allows patients to conveniently schedule consultations with healthcare professionals through an online platform. It provides a user-friendly interface for selecting a doctor based on specialty, location, or availability, ensuring access to trusted medical professionals. Patients can book appointments at their convenience, view doctor profiles, and manage their visits. This system streamlines healthcare services, reduces waiting times, and improves the overall patient experience by making it easy to get timely medical attention.</p>
            </div>

{/*--Center Section---*/}
            <div>
            <p className='text-xl font-medium mb-5'> COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Privacy policy</li>
            </ul>
            </div>

            {/*--Right Section---*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+234 80-6687-9958</li>
                    <li>davidomonebo@gmail.com</li>
                </ul>
            </div>
        </div>

         {/*--copyright---*/}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025@ prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer