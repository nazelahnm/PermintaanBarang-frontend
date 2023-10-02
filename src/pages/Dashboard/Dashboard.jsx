import React, { useEffect, useState } from 'react'

import onProgress from '../../../src/assets/onProgress.png'
import done from '../../../src/assets/done.png'
import { countByStatus, getOrders } from '../../services/FetchingData'
import Pagination from '../../Utils/Pagination'
import FormatDate from '../../Utils/FormatDate'

export default function Dashboard({ searchQuery, datePick }) {
  const [statusAmount, setStatusAmount] = useState([])
  const [data, setData] = useState([])
  const filterData = () => {
    if (!searchQuery && !datePick) {
      return data;
    } else {
      return data.filter(item => {
        const usernameMatch = item.user.username.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = item.category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const dateMatch = item.created_at.includes(datePick);
        if (searchQuery && datePick) {
          return (usernameMatch || categoryMatch) && dateMatch;
        }
        else if (searchQuery) {
          return usernameMatch || categoryMatch;
        }
        else if (datePick) {
          return dateMatch;
        }
        return false;
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const status = await countByStatus();
      const rawData = await getOrders();
      setData(rawData.data)
      setStatusAmount(status.data);
    };

    fetchData();
  }, [])

  const filteredData = filterData();

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getDisplayedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const id = 1
  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      <div className='w-full max-h-full p-4 overflow-auto'>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-semibold'>Report Permintaan Barang</h1>
            <h1 className='text-xl font-semibold'>{getDisplayedData().length} <span className='font-normal'>Total</span></h1>
          </div>
          <div className="flex gap-2 cursor-default ">
            <div className='p-2 text-blue-500 bg-blue-200 rounded-xl'>
              <p className="text-3xl font-semibold text-center">{statusAmount.onProgress}</p>
              <div className="flex items-center gap-2">
                <img src={onProgress} className='w-5 text-blue-500' alt="" />
                <p className='text-lg'>On Progress</p>
              </div>
            </div>
            <div className='p-2 text-green-600 bg-green-200 rounded-xl'>
              <p className="text-3xl font-semibold text-center">{statusAmount.done}</p>
              <div className="flex items-center gap-2">
                <svg width="20px" height="20px" className='font-semibold' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z" />
                </svg>
                <p className='text-lg'>Done</p>
              </div>
            </div>
          </div>
        </div>
        {/* End of Header */}

        {/* Table */}

        <div className="h-[53vh]  mt-10 overflow-auto ">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block w-full align-middle ">
                <div className="overflow-hidden rounded-lg">
                  <table className="w-full divide-y divide-gray-200 shadow-xl ">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-semibold  uppercase bg-[#E4EFE7]">Name</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-semibold  uppercase bg-[#E4EFE7]">Barang</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-semibold  uppercase bg-[#E4EFE7]">Jumlah </th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-semibold  uppercase bg-[#E4EFE7]">Date </th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-semibold  uppercase bg-[#E4EFE7]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {getDisplayedData().length > 0 ? getDisplayedData().map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#F7F7F7]">{item.user.username}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#F7F7F7]">{item.category.name}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#F7F7F7]">{item.amount}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#F7F7F7]"><FormatDate datetime={item.date} /></td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#F7F7F7]">
                            <div className='flex items-center justify-center gap-1'>
                              <img src={item.statusOrder == 'Done' ? done : onProgress} className='w-5' alt="" />
                              <p>{item.status}</p>
                            </div>
                          </td>
                        </tr>
                      )) : <tr><td colSpan='5' className='px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#F7F7F7]'>Tidak ada data</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 mb-3">
          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        {/* End of Table */}


      </div>
    </div>
  )
}
