import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import Suggestion from './SuggestionV2';
import SuggestionsSkeleton from './SuggestionsSkeleton';

interface Props {
  data: any[];
  isLoading: boolean;
  chooseFormat: (format: string, videoId: string) => void;
}
export default function Suggestions(props: Props) {
  const { data, isLoading, chooseFormat } = props;

  return (
    <Box>
      {!!data.length && (
        <Box mt="5">
          <Heading textAlign="center">Suggestions</Heading>
        </Box>
      )}
      {isLoading && <SuggestionsSkeleton />}
      {!isLoading && (
        <SimpleGrid
          gridTemplateColumns="repeat(auto-fit, minmax(max(290px, 40%), 1fr))"
          spacing={10}
          my="5"
        >
          {data.map((suggestion) => {
            return (
              <Suggestion
                data={suggestion}
                key={suggestion.id.videoId}
                chooseFormat={chooseFormat}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}
