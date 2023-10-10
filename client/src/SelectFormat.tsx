import React, { useState, useEffect } from 'react';
import { Box, Button, Select } from '@chakra-ui/react';
import { getFormats } from './utils/API';

interface SelectFormatProps {
  url: string;
}
const SelectFormat: React.FC<SelectFormatProps> = ({ url }) => {
  const [formats, setFormats] = useState<any[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [videoURL, setVideoURL] = useState<string>(
    'https://www.youtube.com/watch?v=6Di-QXaBysA'
  );

  useEffect(() => {
    console.log('CHECK FORMATS');
    const fetchFormats = async () => {
      const data = await getFormats(videoURL);
      data.data.sort((a: any, b: any) => {
        const qualityA = a.qualityLabel || '';
        const qualityB = b.qualityLabel || '';
        return qualityB.localeCompare(qualityA);
      });

      // Wähle die besten vier Formate aus
      const bestFormats = data.data.slice(0, 4);
      setFormats(bestFormats);
      setSelectedFormat(bestFormats[0]?.itag || ''); // Setze das erste Format als Standardauswahl
    };
    fetchFormats();
  }, [videoURL]);

  const handleDownload = () => {
    // Starte den Download mit dem ausgewählten Format
    if (selectedFormat && videoURL) {
      window.location.href = `/download?url=${encodeURIComponent(
        videoURL
      )}&format=${selectedFormat}`;
    }
  };

  return (
    <Box p={4}>
      <input
        type="text"
        placeholder="YouTube Video URL"
        onChange={(e) => setVideoURL(e.target.value)}
      />
      <Select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        {formats.map((format) => (
          <option key={format.itag} value={format.itag}>
            {format.qualityLabel || format.container}
          </option>
        ))}
      </Select>
      <Button onClick={handleDownload}>Download</Button>
    </Box>
  );
};

export default SelectFormat;
