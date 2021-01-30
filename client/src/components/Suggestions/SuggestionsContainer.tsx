import React from 'react';
import SuggestionCard from './Suggestion';
import { Grid, Box, Fade } from '@material-ui/core';
import { Suggestion } from '../../Typings';

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
    <Fade in timeout={1000}>
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
    </Fade>
  );
};

export default SuggestionsContainer;
