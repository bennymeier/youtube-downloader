import React, { useState } from 'react';
import { IconButton, Input, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FormatRadios from './FormatRadios';

interface Props {
  handleSearch: (searchString: string, format: string) => void;
}
const SearchContainer: React.FC<Props> = (props) => {
  const { handleSearch } = props;
  const [input, setInput] = useState('');
  const [format, setFormat] = useState('mp4');

  const handleSearchClick = () => {
    handleSearch(input, format);
  };

  const handleFormatChange = (format: string) => {
    setFormat(format);
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      handleSearch(input, format);
    }
  };

  return (
    <>
      <Box display="flex">
        <Input
          placeholder="Directlink or search for suggestions..."
          onChange={(event) => setInput(event.target.value)}
          fullWidth
          onKeyDown={handleKeydown}
        />
        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box>
        <FormatRadios onChange={handleFormatChange} />
      </Box>
    </>
  );
};

export default SearchContainer;
