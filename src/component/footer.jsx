import React from 'react'

const Footer = () => {
    return (
        <div className='bg-violet-600 flex flex-col  justify-around md:justify-between h-auto   pt-3 px-2 items-center  w-full h-10 mt-auto '>

            
            <div className='flex justify-between w-full'>

            
            <div className='text-gray-300 flex flex-col text-[12px]'>Contacts : <br />
                <a href="mailto:krishpatel1567@gmail.com" className='text-gray-300 hover:underline'>
                    krishpatel1567@gmail.com
                </a>
                <a href="tel:+917265809546" className='text-gray-300 hover:underline'>
                    7265809546
                </a>
                <a href="https://wa.me/7265809546" className='text-gray-300 hover:underline'>
                    Chat on WhatsApp
                </a>
            </div>
            <button>
                <a className='text-white  rounded-full flex justify-center cursor-pointer  items-center ring ring-1 bg-purple-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300' href="https://github.com/krishpatel1567-dot/E-Commerce-web">
                    <img className='invert p-1 w-10' src="/github.svg" alt="" />
                    <span className="font-bold px-1 text-gray-200">GitHub</span>
                </a>
            </button></div>
            <div className='flex items-center justify-center text-gray-300 text-sm '>
                Created with <img className='w-7 mx-2' src="/heart.png" alt="" /> by Krish
            </div>
        </div>
    )
}

export default Footer