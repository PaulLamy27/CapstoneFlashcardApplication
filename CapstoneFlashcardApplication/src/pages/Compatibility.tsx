import React from 'react'
import phone from '../assets/iphone.jpg'

const Compatibility = () => {
  return (
    <div className='w-full py-16 px-4 text-white'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold'>COMPATIBILITY</p>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Designed to be navigable on mobile and computer</h1>
                <p>When designing CardMentor, we kept im mind how many people would be accessing our app on a mobile device. We tried our best to create an environment that works well for everyone.</p>
                <button className='text-[#13163b] bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3'>Get Started</button>
            </div>
            <img className='w-[500px] mx-auto my-4' src={phone} alt="/" />
        </div>
    </div>
  )
}

export default Compatibility