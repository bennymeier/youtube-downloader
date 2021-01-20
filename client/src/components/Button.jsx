import React from 'react';

const Button = (props) => {
  const { onClick } = props;
  return (
    <>
      <button className="btn-animate" onClick={onClick}>
        Search
      </button>
    </>
  );
};

export default Button;
