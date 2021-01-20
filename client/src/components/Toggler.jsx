import React from 'react';

const Toggler = ({ onClick }) => {
  return (
    <>
      <div
        className="btn-toggler"
        onClick={onClick}
        title="Switch to Dark or Light Mode"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
        </svg>
      </div>
    </>
  );
};

export default Toggler;
