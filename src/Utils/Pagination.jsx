import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center justify-center gap-4'>
      <button onClick={handlePrevPage} disabled={currentPage === 1} className={`flex items-center gap-1 font-semibold text-[#526D82] ${currentPage !== 1 && `hover:scale-102 active:scale-95`} duration-200  ${currentPage === 1 && `bg-[#BEDBBB] text-[#C2E8CE] `} ${currentPage !== 1 && `bg-[#3E7C17] text-[#EEEEEE] shadow`}   px-5 py-2 justify-between rounded-xl  `}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Prev
      </button>
      <div className='flex items-center gap-2 font-medium text-[#F2EFEA]'>
        <p className='px-2 bg-[#F4A442] rounded-xl'>{currentPage}</p>
        <span className='text-gray-600'>/</span>
        <p className='px-2 bg-[#F4A442] rounded-xl'>{totalPages}</p>
      </div>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`flex items-center justify-between px-5 py-2  rounded-xl gap-1 font-semibold  ${currentPage !== totalPages && `hover:scale-102 active:scale-95`}  duration-200  ${currentPage === totalPages && 'bg-[#BEDBBB] text-[#C2E8CE]'} ${currentPage !== totalPages && 'bg-[#3E7C17] text-[#EEEEEE] shadow'}`}>
        <p>Next</p>
        <svg width="20px" height="20px" className='rotate-180' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
