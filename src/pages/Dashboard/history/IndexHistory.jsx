import React, { useEffect, useState } from 'react'
import onProgress from '../../../../src/assets/onProgress.png'
import done from '../../../../src/assets/done.png'
import PdfIcon from '../../../assets/pdf.png'

import { Link } from 'react-router-dom'
import Pagination from '../../../Utils/Pagination'
import { getHistory } from '../../../services/FetchingData'
import moment from 'moment/moment'

export default function IndexHistory({ searchQuery, datePick }) {
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [users, setUsers] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([])
  const fetchData = async () => {
    const rawData = await getHistory(month); // Make sure 'month' is defined
    setUsers(rawData.data.userLength);
    setAmount(rawData.data.amount);
    setData(rawData.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [month]); // Refetch data when 'month' changes

  useEffect(() => {
    if (datePick) {
      const fetchHistoricalData = async () => {
        const historicalData = await getHistory(datePick);
        setUsers(historicalData.data.userLength);
        setAmount(historicalData.data.amount);
        setData(historicalData.data.data);
      };

      fetchHistoricalData();
    }
  }, [datePick]);

  const filterData = () => {
    if (!searchQuery && !datePick) {
      return data;
    } else if (searchQuery) {
      return data.filter(item => {
        const usernameMatch = item.userName.toLowerCase().includes(searchQuery.toLowerCase());
        return usernameMatch;
      });
    } else if (datePick) {
      return data; // Already handled in the separate useEffect for historical data
    } else {
      return data;
    }
  };

  const filteredData = filterData();

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getDisplayedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Add index to each item in filteredData
    const indexedData = filteredData.map((item, index) => ({
      ...item,
      index: index + 1
    }));

    return indexedData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      <div className='w-full h-full p-4 overflow-auto'>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-semibold'>History Permintaan Barang   </h1>
            <p className='text-xl font-bold'>{users} <span className='text-lg font-medium text-gray-600'>Total Pengguna</span></p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold">{amount}</p>
            <p className="text-sm text-gray-400">Total Permintaan Barang</p>
          </div>
        </div>
        {/* End of Header */}

        

        {/* Table */}

        <div className="h-[55vh]  mt-10 overflow-auto ">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block w-full align-middle ">
                <div className="overflow-hidden rounded-lg">
                  <table className="w-full divide-y divide-gray-200 shadow-xl">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">No</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Nama</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Jumlah Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {getDisplayedData().length > 0 ? getDisplayedData().map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.index}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.userName}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">{item.amount}</td>

                          <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium bg-[#FFFFE8]">
                            <Link to={`/history/user/${item.userId}`} className='px-10 py-1 rounded-full  text-white bg-[#68B92E]'>Lihat</Link>
                          </td>
                        </tr>
                      )) :
                        <tr>
                          <td colSpan="5" className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">Data tidak ditemukan</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End of Table */}
        <div className="mt-6 mb-3">
          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
