import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';

import UserIcon from '../../src/assets/user.png'
import DashboardIcon from '../../src/assets/dashboard.png'
import PengajuanIcon from '../../src/assets/pengajuan.png'
import HistoryIcon from '../../src/assets/history.png'
import { getUserLogged, removeToken } from '../services/FetchingData';

export default function Sidebar() {
  const router = useLocation();
  const currentUrl = router.pathname;

  const [userLogged, setUserLogged] = useState({})

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const logout = removeToken()
      navigate('/login')
    } catch (error) {
    }
  }


  useEffect(() => {
    const user = getUserLogged()
    if (!user) navigate('/login')
    setUserLogged(user)
  }, [])



  return (
    <div className='w-[20%] bg-white overflow-hidden shadow-xl rounded-2xl p-4 flex flex-col justify-between'>
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 max-lg:justify-center">
          <img src={UserIcon} alt="" className='w-14' />
          <div className="flex flex-col max-lg:hidden">
            <h1 className='text-2xl font-semibold'>{userLogged.username}</h1>
            <h1 className='text-sm'>Selamat datang, {userLogged.role}</h1>
          </div>
        </div>
        {/* End of Header */}

        <div className="divider"></div>
      </div>

      {/* List menu */}
      <div className="flex flex-col h-full gap-3">
        <Link to={'/'} className={`flex items-center gap-3 p-3  hover:scale-104 active:scale-95 max-lg:justify-center duration-300 ease-in-out ${currentUrl === '/' && `active`}`}>
          <img src={DashboardIcon} className='w-6' alt="" />
          <span className='max-lg:hidden'>dashboard</span>
        </Link>
        <Link to={'/pengajuan'} className={`flex items-center gap-3 p-3  hover:scale-104 active:scale-95 max-lg:justify-center duration-300 ease-in-out ${currentUrl.includes('pengajuan') && `active`}`}>
          <img src={PengajuanIcon} className='w-6' alt="" />
          <span className='max-lg:hidden'>pengajuan</span>
        </Link>
        <Link to={'/history'} className={`flex items-center gap-3 p-3  hover:scale-104 active:scale-95 max-lg:justify-center duration-300 ease-in-out ${currentUrl.includes('history') && `active`}`}>
          <img src={HistoryIcon} className='w-6' alt="" />
          <span className='max-lg:hidden'>history</span>
        </Link>
      </div>
      {/* End of List menu */}

      {/* Footer */}
      <button onClick={handleLogout} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-700 ease-out border-2 border-green-500 rounded-full shadow-md group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-700 transform group-hover:translate-x-full ease">Logout</span>
        <span className="relative invisible">Logout</span>
      </button>
    </div>
  )
}
