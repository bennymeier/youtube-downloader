import React from "react";

export default (props) => {
  const { onClick } = props;
  return (
    <>
      <button className="btn-animate" onClick={onClick}>
        Search
      </button>
    </>
  );
};
