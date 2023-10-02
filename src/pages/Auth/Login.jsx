import React, { useState } from 'react'

import logo from '../../assets/logo.png'
import { loginAdmin, setToken } from '../../services/FetchingData';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await loginAdmin(form.username, form.password)
      if (res.status === 200) {
        setToken(res.data)
        navigate('/')
      }

    } catch (error) {

      setMessage(error.response.data.message)
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
        setMessage('')
      }, 3000);
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      {alert && (
        <div
          className="z-50 transition-transform duration-300 ease-in-out transform translate-y-0 toast toast-top toast-end"
        >
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        </div>
      )}
      <div className="shadow-xl card md:w-[60vw] w-full h-full md:h-[80vh] bg-[#EEEDED] rounded-3xl ">
        <div className="m-6 card-body">
          <div className="flex items-center justify-center h-full gap-3">
            <div className="flex flex-col items-center w-1/2 max-lg:hidden">
              <img src={logo} alt="logo" className="w-60" />
              <div className="mt-4 text-2xl font-medium text-center">
                <p>Badan Pusat Statistik</p>
                <p>Kota Mojokerto  </p>
              </div>
            </div>
            <div className="w-1/2 max-lg:w-full h-full bg-[#fff] rounded-3xl shadow-xl p-6">
              <h1 className='p-4 text-3xl font-semibold'>Login Admin</h1>
              <div className="h-[80%] flex justify-evenly flex-col">
                <form onSubmit={handleLogin}>
                  <div>
                    <div className='my-5'>
                      <label htmlFor="first_name" className="block mb-2 font-medium text-gray-900 text-md ">Username</label>
                      <input type="text" id="first_name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg text-md focus:ring-blue-500 focus:border-blue-500" placeholder="Username" required autoFocus name='username' onChange={handleChange} value={form.username} />
                    </div>
                    <div className='my-5'>
                      <label htmlFor="second_name" className="block mb-2 font-medium text-gray-900 text-md ">Password</label>
                      <input type="password" id="second_name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg text-md focus:ring-blue-500 focus:border-blue-500" placeholder="Username" required name='password' onChange={handleChange} value={form.password} />
                    </div>
                  </div>
                  <div className='text-center'>
                    <button onClick={handleLogin} className="w-[80%] text-white bg-green-500 hover:bg-green-600 btn">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
