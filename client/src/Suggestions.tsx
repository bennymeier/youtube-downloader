import { Box } from '@chakra-ui/react';
import Suggestion from './Suggestion';

interface Props {
  data: any[];
  chooseFormat: (format: string, videoId: string) => void;
}
export default function Suggestions(props: Props) {
  const { data, chooseFormat } = props;
  return (
    <Box>
      {data.map((suggestion) => {
        return (
          <Suggestion
            data={suggestion}
            key={suggestion.id.videoId}
            chooseFormat={chooseFormat}
          />
        );
      })}
    </Box>
  );
}
