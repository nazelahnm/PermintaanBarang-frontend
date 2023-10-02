import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showHistoryByUser } from '../../../services/FetchingData'
import { useLocation } from 'react-router-dom'
import FormatDate from '../../../Utils/FormatDate'
import Pagination from '../../../Utils/Pagination'
import moment from 'moment/moment'
import PdfIcon from '../../../assets/pdf.png'


const DetailByUser = ({ searchQuery, datePick }) => {
  const location = useLocation()
  const [user, setUser] = useState('')
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [data, setData] = useState([])
  const id = location.pathname.split('/')[3]

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await showHistoryByUser(id)
      setData(rawData.data.data)
      setUser(rawData.data.user)
    }
    fetchData()
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const filterData = () => {
    if (!searchQuery && !datePick) {
      return data;
    } else {
      return data.filter(item => {
        const CategoryMatch = item.category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const amount = item.amount.toString().includes(searchQuery.toLowerCase());
        const dateMatch = item.date.includes(datePick);
        if (searchQuery && datePick) {
          return (CategoryMatch || amount) && dateMatch;
        }
        else if (searchQuery) {
          return CategoryMatch || amount
        }
        else if (datePick) {
          return dateMatch;
        }
        return false;
      });
    }
  };
  const filteredData = filterData();
  const getDisplayedData = () => {
    if (!Array.isArray(filteredData)) {
      return [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataWithIndex = filteredData.map((item, index) => ({ ...item, index: index + 1 }));
    return dataWithIndex.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      <div className='w-full h-full p-4 overflow-auto'>
        <Link to={'/history'} className='flex items-center gap-1 p-3 mb-3 duration-300 hover:scale-103 w-fit hover:bg-gray-200 rounded-xl hover:shadow-xl active:scale-100'>
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
              <p className="text-xl font-semibold">{user.username}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold">{data.length}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
        {getDisplayedData().length > 0 && <Link to={`/exportPdf/${id}/${datePick != '' ? datePick : month}`} className="flex justify-end">
          <img src={PdfIcon} className='w-12' alt="" />
        </Link>}
        <div className="h-[65vh]  mt-10 overflow-auto ">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block w-full align-middle ">
                <div className="overflow-hidden rounded-lg ">
                  <table className="w-full divide-y divide-gray-200 ">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">No</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Tanggal</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Jumlah</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {getDisplayedData().length > 0 ? getDisplayedData().map((item, index) =>
                      (<tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.index}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]"><FormatDate datetime={item.date} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">{item.category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">
                          <Link to={`/history/detail/${item.id}`} className='px-10 py-1 rounded-full  text-white bg-[#68B92E]'>Lihat</Link>
                        </td>
                      </tr>)) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">No Data</td>
                        </tr>
                      )}
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
      </div>
    </div>
  )
}

export default DetailByUser