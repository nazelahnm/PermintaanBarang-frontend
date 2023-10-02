import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Accept from '../../../assets/accept.png';
import Reject from '../../../assets/reject.png';
import { Link } from 'react-router-dom'
import { showOrderDetail } from '../../../services/FetchingData'
import FormatDate from '../../../Utils/FormatDate'


export default function DetailsHistory({ searchQuery, datePick }) {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await showOrderDetail(id)
      setData(rawData.data[0])
      // setUser(rawData.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      <div className='w-full h-full p-4 overflow-auto'>
        <Link to={`/history/user/${data?.user?.id}`} className='flex items-center gap-1 p-3 mb-3 duration-300 hover:scale-103 w-fit hover:bg-gray-200 rounded-xl hover:shadow-xl active:scale-100'>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className='font-semibold'>Back</span>
        </Link>
        {/* Header */}
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-semibold'>Detail Pengajuan Barang </h1>
            <div className="flex items-center justify-between bg-[#eb891b] p-2 rounded-xl text-white gap-10">
              <p className="text-xl font-semibold">{data?.user?.username}</p>
              <p className="text-lg"><FormatDate datetime={data.date} /></p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold">{data?.amount}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
        <div className="h-[65vh]  mt-10 overflow-auto ">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block w-full align-middle ">
                <div className="overflow-hidden rounded-lg ">
                  <table className="w-full divide-y divide-gray-200 ">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Nama Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Jumlah</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{data?.category?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{data.namaBarang}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{data.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">
                          <div className="flex items-center justify-center gap-2">
                            <img src={data.statusRequest == 'Accept' ? Accept : Reject} alt={data.status} width={40} />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
