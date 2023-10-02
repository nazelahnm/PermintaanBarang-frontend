import React from 'react'

import Menu from '../../src/assets/menu.png'
import { useLocation } from 'react-router-dom';

export default function Navbar({ onSearch, pickDate }) {
  const location = useLocation();
  const paramsId = location.pathname.split('/')[3];
  const isHistory = (location.pathname === '/history' || location.pathname.includes('/history/user'));
  const isDetailHistory = location.pathname == `/history/detail/${paramsId}`;
  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };
  const handleDateChange = (event) => {
    const date = event.target.value;
    pickDate(date);
  }
  return (
    !isDetailHistory && <div className='flex items-center justify-between w-full gap-10 p-4 bg-white shadow-lg h-fit rounded-xl'>
      <div className="w-1/2 gap-4 md:w-1/2 max-md:flex max-md:items-center max-md:gap-3">
        <img src={Menu} className='w-10 md:hidden' alt="" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full" placeholder="Search" required onChange={handleSearchChange} />
          {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button> */}
        </div>
      </div>

      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input type={isHistory ? 'month' : 'date'} onChange={handleDateChange} className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 pl-14" placeholder="Select date" />
      </div>

    </div>
  )
}
