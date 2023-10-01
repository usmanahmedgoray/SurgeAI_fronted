import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({aiLogo}) => {
  return (
    <>
        <header className='w-[25rem] md:w-full md:justify-between bg-white sm:px-8 px-4 py-4 border-b-[#e6ebf4] flex justify-center items-center flex-col md:flex-row '>
        <Link to="/" className='flex justify-center items-center'>
          <img src={aiLogo} alt="logo" className='w-12 object-contain mx-1 xs:w-6' />
          <span className='mx-1 text-2xl font-bold xs:text-lg'>Surge</span>
        </Link>
        <div className='mt-8 md:mt-2 '>
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] active:bg-[#494ee2] text-white px-4 py-2 rounded-md mx-2" >Create</Link>
        <Link to="/create-variation" className="font-inter font-medium bg-[#6469ff] active:bg-[#494ee2] text-white px-4 py-2 rounded-md mx-2" >Variation</Link>
        </div>
      </header>
    </>
  )
}

export default Navbar