import React, { useEffect, useState } from 'react'
import onProgress from '../../../../src/assets/onProgress.png'
import done from '../../../../src/assets/done.png'

import { Link } from 'react-router-dom'
import { deleteOrder, getByStatus, showOrder } from '../../../services/FetchingData'
import Pagination from '../../../Utils/Pagination'
export default function IndexPengajuan({ searchQuery, datePick }) {
  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
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
      const rawData = await getByStatus('On Progress');
      setData(rawData.data)
    };

    fetchData();
  }, [])

  const filteredData = filterData();

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getDisplayedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filteredData.map((item, index) => {
      item.index = index + 1
    })
    return filteredData.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const getDataModal = async (id) => {
  //   const dataModal = await showOrder(id)
  //   setDataModal(dataModal.data)
  //   window.my_modal_1.showModal()
  // }
  // const deleteData = async (id) => {
  //   const destroy = await deleteOrder(id)
  //   setAlert(true)
  //   setAlertMessage(destroy.data.message);
  //   window.my_modal_1.close()
  //   const rawData = await getByStatus('On Progress');
  //   setData(rawData.data)
  //   setTimeout(() => {
  //     setAlert(false)
  //     setAlertMessage('')
  //   }, 2500);
  // }
  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      {alert && (
        <div
          className="z-50 transition-transform duration-300 ease-in-out transform translate-y-0 toast toast-top toast-end"
        >
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <div className='w-full h-full p-4 overflow-auto'>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-semibold'>List Permintaan Barang</h1>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold">{getDisplayedData().length}</p>
            <p className="text-sm text-gray-400">Total</p>
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
                        <th scope="col" className="px-6 py-2 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">No</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Nama</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Jumlah Barang</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Status</th>
                        <th scope="col" className="px-6 py-2 text-center text-sm font-bold  uppercase bg-[#CFE8A9]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {getDisplayedData().length > 0 ? getDisplayedData().map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.index}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.user.username}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">{item.amount}</td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">
                            <p className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${item.statusOrder == 'Done' && 'bg-green-500'} ${item.statusOrder == 'On Progress' && 'bg-blue-500'} ${item.statusOrder == 'Requested' && 'bg-yellow-500'} text-white`}>{item.statusOrder}</p>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium bg-[#FFFFE8]">
                            <div className="flex items-center justify-center gap-2">
                              <Link to={`/pengajuan/${item.id}`} className='duration-200 ease-in-out hover:scale-105 tooltip' data-tip="Detail">
                                <svg width="40" height="40" className='text-blue-500' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                                  <path fill="currentColor" fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z" />
                                </svg>
                              </Link>
                              {/* <button data-tip="Delete" onClick={() => getDataModal(item.id)} className='text-red-500 duration-200 ease-in-out hover:scale-105 tooltip'>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M14 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button> */}
                            </div>
                          </td>
                        </tr>
                      )) :
                        <tr>
                          <td colSpan="5" className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">Data tidak ditemukan</td>
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

      {/* <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Alert!</h3>
          <p className="py-2">Apakah anda yakin  <span className="font-bold">Menghapus</span> data ini?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => deleteData(dataModal[0].id)}>Hapus</button>
            <button className="btn">Tidak</button>
          </div>
        </form>
      </dialog> */}
    </div>

  )
}
