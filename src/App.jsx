import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/error/NotFound';
import Login from './pages/Auth/Login';
import IndexPengajuan from './pages/Dashboard/pengajuan/IndexPengajuan';
import IndexHistory from './pages/Dashboard/history/IndexHistory';
import DetailsHistory from './pages/Dashboard/history/DetailsHistory';
import DetailByUser from './pages/Dashboard/history/DetailByUser';
import DetailsPengajuan from './pages/Dashboard/pengajuan/DetailsPengajuan';
import ExportPdf from './pages/Dashboard/Export/ExportPdf';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateSelect, setDateSelect] = useState('')
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isExportPdf = location.pathname.includes('/exportPdf');

  return (
    <div className={`${!(isLoginPage || isExportPdf) && `p-4 flex gap-4 h-screen bg-[#efefef]`} overflow-hidden`}>
      {!(isLoginPage || isExportPdf) && <Sidebar />}
      <div className='flex flex-col w-full max-h-screen gap-4 '>
        {!(isLoginPage || isExportPdf) && <Navbar onSearch={setSearchQuery} pickDate={setDateSelect} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/pengajuan" element={<IndexPengajuan searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/pengajuan/:id" element={<DetailsPengajuan searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/history" element={<IndexHistory searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/history/user/:id" element={<DetailByUser searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/history/detail/:id" element={<DetailsHistory searchQuery={searchQuery} datePick={dateSelect} />} />
          <Route path="/exportPdf/:id/:date" element={<ExportPdf  />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
