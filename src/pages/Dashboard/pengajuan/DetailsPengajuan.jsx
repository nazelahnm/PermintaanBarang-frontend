import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Accept from '../../../assets/accept.png';
import Reject from '../../../assets/reject.png';
import { deleteOrderDetail, showOrder, showOrderDetail, updateOrderDetail } from '../../../services/FetchingData'
import FormatDate from '../../../Utils/FormatDate';

export default function DetailsPengajuan({ searchQuery, datePick }) {
  const [dataModal, setDataModal] = useState([])
  const { id } = useParams()
  const [data, setData] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [paramsUrl, setParamsUrl] = useState(id)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await showOrder(id);
      setOrderDetails(rawData.data)
      setData(rawData.data[0])
    };
    fetchData();
  }, [])


  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const filterData = () => {
    if (!searchQuery && !datePick) {
      return OrderDetails;
    } else {
      return OrderDetails.filter(item => {
        const subCategoryMatch = item.subCategory.name.toLowerCase().includes(searchQuery.toLowerCase());
        const namaMatch = item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase());
        const dateMatch = item.createdAt.includes(datePick);
        if (searchQuery && datePick) {
          return (subCategoryMatch || namaMatch) && dateMatch;
        }
        else if (searchQuery) {
          return subCategoryMatch || namaMatch
        }
        else if (datePick) {
          return dateMatch;
        }
        return false;
      });
    }
  };

  const getDisplayedData = () => {
    const filteredData = filterData();

    if (!Array.isArray(filteredData)) {
      return []
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const dataWithIndex = filteredData.map((item, index) => ({ ...item, index: index + 1 }));

    return dataWithIndex.slice(startIndex, endIndex);
  };
  const getDataModal = async (id, modal) => {
    setDataModal({ id: id })
    switch (modal) {
      case 1:
        window.my_modal_1.showModal()
        break;
      case 2:
        window.my_modal_2.showModal()
        break;
      case 3:
        window.my_modal_3.showModal()
        break;
      default:
        break;
    }
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const deleteData = async (id) => {
    const deleteData = await deleteOrderDetail(id)
    setAlert(true)
    setAlertMessage(deleteData.data.message);
    setAlertType('success')
    window.my_modal_1.close()
    if (deleteData.status == 200) {
      navigate('/pengajuan')
    }
    setTimeout(() => {
      setAlert(false)
      setAlertMessage('')
      setAlertType('')
    }, 2500)
  }
  const acceptData = async (id) => {
    const updateData = await updateOrderDetail(id, { statusRequest: 'Accept' })
    setAlert(true)
    setAlertMessage(updateData.data.message);
    setAlertType('success')
    window.my_modal_2.close()
    if (updateData.status == 200) {
      navigate('/pengajuan')
    }
    setTimeout(() => {
      setAlert(false)
      setAlertMessage('')
      setAlertType('')
    }
      , 2500)
  }
  const rejectData = async (id) => {
    const updateData = await updateOrderDetail(id, { statusRequest: 'Reject' })
    setAlert(true)
    setAlertMessage(updateData.data.message);
    setAlertType('success')
    window.my_modal_3.close()
    if (updateData.status == 200) {
      navigate('/pengajuan')
    }
    setTimeout(() => {
      setAlert(false)
      setAlertMessage('')
      setAlertType('')
    }
      , 2500)
  }
  return (
    <div className="overflow-hidden bg-white rounded-xl p-0.5 w-full h-full shadow-xl">
      {alert && (
        <div
          className="z-50 transition-transform duration-300 ease-in-out transform translate-y-0 toast toast-top toast-end"
        >
          <div className={`alert alert-${alertType}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <div className='w-full h-full p-4 overflow-auto'>
        <Link to={'/pengajuan'} className='flex items-center gap-1 p-3 mb-3 duration-300 hover:scale-103 w-fit hover:bg-gray-200 rounded-xl hover:shadow-xl active:scale-100'>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className='font-semibold'>Back</span>
        </Link>
        {/* Header */}

        {data ? (
          <div className="flex items-center justify-between ">
            <div className="flex flex-col gap-2">
              <h1 className='text-3xl font-semibold'>Detail Pengajuan Barang </h1>
              <div className="flex items-center justify-between bg-[#eb891b] p-2 rounded-xl text-white gap-10">
                <p className="text-xl font-semibold">{data?.User?.username}</p>
                <p className="text-lg"><FormatDate datetime={data?.date} /></p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold">{data?.amount}</p>
              <p className="text-sm text-gray-400">Total</p>
            </div>
          </div>
        ) : (
          <div role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}


        {/* End of Header */}

        {/* Table */}

        <div className="h-[65vh]  mt-10 overflow-auto ">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block w-full align-middle ">
                <div className="overflow-hidden rounded-lg ">
                  <table className="w-full divide-y divide-gray-200 ">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">No</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Nama Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Jumlah Barang</th>
                        <th scope="col" className="px-6 py-3 text-center text-sm font-semibold  uppercase bg-[#CFE8A9]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {getDisplayedData() ? getDisplayedData().map((item, index) =>
                      (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.index}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center bg-[#FFFFE8]">{item.namaBarang}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center bg-[#FFFFE8]">{item.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium bg-[#FFFFE8]">
                            {item.statusRequest == 'Pending' ? <div className="flex items-center justify-center gap-2">
                              <button data-tip="Accept" onClick={() => getDataModal(item.id, 2)} className='text-green-500 duration-200 ease-in-out hover:scale-105 tooltip'>
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                  <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <button data-tip="Reject" onClick={() => getDataModal(item.id, 3)} className='text-red-500 duration-200 ease-in-out hover:scale-105 tooltip'>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" fill="currentColor" />
                                  <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="currentColor" />
                                </svg>
                              </button>

                              <button data-tip="Delete" onClick={() => getDataModal(item.id, 1)} className='text-red-500 duration-200 ease-in-out hover:scale-105 tooltip'>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M14 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div> :
                              <div className="flex items-center justify-center gap-2">
                                <img src={item.statusRequest == 'Accept' ? Accept : Reject} alt={item.status} width={40} />
                              </div>
                            }
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

        {/* End of Table */}
      </div>

      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Alert!</h3>
          <p className="py-2">Apakah anda yakin <span className="font-bold">Menghapus</span> data ini?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => deleteData(dataModal.id)}>Hapus</button>
            <button className="btn">Tidak</button>
          </div>
        </form>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Alert!</h3>
          <p className="py-2">Apakah anda yakin <span className="font-bold">Menyetujui</span> permintaan ini?</p>
          <div className="modal-action">
            <button className="btn btn-success" onClick={() => acceptData(dataModal.id)}>Setuju</button>
            <button className="btn">Tutup</button>
          </div>
        </form>
      </dialog>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Alert!</h3>
          <p className="py-2">Apakah anda yakin <span className="font-bold">Menolak</span> Permintaan ini?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => rejectData(dataModal.id)}>Tolak</button>
            <button className="btn">Tutup</button>
          </div>
        </form>
      </dialog>
    </div >
  )
}
