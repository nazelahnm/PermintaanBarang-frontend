import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/logo.png'
import { exportData } from '../../../services/FetchingData'
import { useLocation } from 'react-router-dom'

const ExportPdf = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState()

  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const date = location.pathname.split('/')[3]


  const fetchData = async () => {
    const rawData = await exportData(id, date);
    setData(rawData.data.dataFound);
    setUser(rawData.data.userFound);
    console.log(rawData.data.userFound);
    if (rawData.data.dataFound.length == 0) {
      window.location.href = `/history/user/${id}`
    } else {
      countDown()
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const countDown = () => {
    setTimeout(() => {
      window.print()
    }, 1000);
  }

  return (
    <div className="h-full pt-5 overflow-auto uppercase">
      <div className="px-10 pb-10">
        <div className="flex items-center">
          <div className="">
            <img src={Logo} alt="logo" className="w-24" />
          </div>
          <div className=" text-center w-[65vw]">
            <h1 className="text-2xl font-semibold">Badan Pusat Statistik</h1>
            <h1 className="text-2xl font-semibold">Kota Mojokerto</h1>
          </div>
        </div>
        <div className="text-lg font-semibold text-center underline">form permintaan atk/ark</div>
        <div className="grid grid-cols-4">
          <div className=""></div>
          <div className="col-span-2 ">nomor : </div>
          <div className=""></div>
        </div>

        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <tbody>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-3 font-semibold text-gray-900 whitespace-nowrap">
                  Tujuan
                </th>
                <td className="px-6 py-3">
                  : SUBBAGIAN UMUM
                </td>
              </tr>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-3 font-semibold text-gray-900 whitespace-nowrap">
                  Dari Pegawai
                </th>
                <td className="px-6 py-3">
                  : {user && user.username}
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        {/* Table content */}
        <div className="mt-5">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden border-t border-black border-x">
                  <table className="min-w-full ">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-2 text-xs font-medium text-center uppercase border-b border-r border-black">No</th>
                        <th scope="col" className="px-6 py-2 text-xs font-medium text-center uppercase border-b border-r border-black">Banyaknya</th>
                        <th scope="col" className="px-6 py-2 text-xs font-medium text-center uppercase border-b border-r border-black">Nama Barang</th>
                        <th scope="col" className="px-6 py-2 text-xs font-medium text-center uppercase border-b border-black">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data && data.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-1 text-sm font-medium text-center border-b border-r border-black whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-1 text-sm font-medium text-center border-b border-r border-black whitespace-nowrap ">{item.amount}</td>
                          <td className="px-6 py-1 text-sm text-center border-b border-r border-black whitespace-nowrap ">{item.namaBarang}</td>
                          <td className="px-6 py-1 text-sm text-center border-b border-black whitespace-nowrap" ></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <p className="text-base capitalize ">Mojokerto, .........................................................</p>
        </div>

        <div className="flex justify-between w-full gap-10 mt-4">
          <div className=" max-h-96 w-96">
            <p className="text-sm text-center">Yang menerima :</p>
            <p className="text-sm text-center mt-28">{user && user.username}</p>
            <div className="border-t-2 border-black "></div>
            <p className="text-sm">NIP.</p>
          </div>
          <div className=" max-h-96 w-96">
            <p className="text-sm text-center">Mengetahui,</p>
            <p className="text-sm text-center">kepala subbagian umum</p>
            <div className="mt-24 border-t-2 border-black "></div>
            <p className="text-sm">NIP.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ExportPdf
