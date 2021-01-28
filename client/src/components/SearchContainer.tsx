import React, { useState } from 'react';
import { IconButton, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchContainer = () => {
  const [input, setInput] = useState('');
  console.log(input);
  return (
    <>
      <div>
        <Input onChange={(event) => setInput(event.target.value)} fullWidth />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
    </>
  );
};

export default SearchContainer;
