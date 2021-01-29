import React from 'react';
import SuggestionCard from './Suggestion';
import { Grid, Box } from '@material-ui/core';

interface Suggestion {
  title: string;
  videoId: string;
}
interface Props {
  suggestions: Suggestion[];
  onClick: (url: string, format: string) => void;
}
const SuggestionsContainer: React.FC<Props> = (props) => {
  const { suggestions, onClick } = props;
  const handleDownload = (url: string, format: string) => {
    onClick(url, format);
  };

  return (
    <Box marginTop="1em">
      <Grid container spacing={3} justify="center">
        {suggestions.map((suggestion) => {
          return (
            <SuggestionCard
              key={suggestion.videoId}
              {...suggestion}
              onClick={handleDownload}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SuggestionsContainer;
