import React from "react";

export default (props) => {
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Type Here"
          spellCheck={false}
        />
      </div>
    </>
  );
};
