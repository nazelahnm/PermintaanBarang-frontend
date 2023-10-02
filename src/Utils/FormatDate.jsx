import React from 'react';

const FormatDate = ({ datetime }) => {
  const formatDate = (inputDate) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(inputDate).toLocaleDateString('id-ID', options);
  };

  return <span>{formatDate(datetime)}</span>;
};

export default FormatDate;
