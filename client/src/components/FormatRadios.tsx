import React, { useEffect, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { changeFormatStorage, getFormat } from '../utils/helpers';

const formats = ['mp4', 'mp3', 'wav', 'flv'];
interface Props {
  onChange: (format: string) => void;
}

const FormatRadios: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [format, setFormat] = useState('mp4');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(event.target.value);
    changeFormatStorage(event.target.value);
    onChange(format);
  };

  useEffect(() => {
    const formatStorage = getFormat();
    if (formatStorage) {
      setFormat(formatStorage);
    }
  }, []);

  return (
    <>
      <RadioGroup
        value={format}
        onChange={handleChange}
        style={{ flexDirection: 'row', justifyContent: 'center' }}
      >
        {formats.map((formatValue) => {
          return (
            <FormControlLabel
              key={formatValue}
              value={formatValue}
              control={
                <Radio
                  name="format"
                  inputProps={{ 'aria-label': formatValue }}
                />
              }
              label={formatValue}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default FormatRadios;
