import { ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Image,
  Grid,
  useColorModeValue,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { formats } from './utils/helpers';

interface Props {
  data: any;
  chooseFormat: (format: string, videoId: string) => void;
}
export default function ConvertBox(props: Props) {
  const { data, chooseFormat } = props;

  return (
    <Box
      transition="all .2s ease-in-out"
      bgColor={useColorModeValue('gray.100', 'gray.600')}
      m="5"
      _hover={{
        background: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      <Box>
        <Grid alignItems="center" gridAutoFlow="column">
          <Image
            src={data.thumbnails[2].url}
            alt={`Thumbnail of ${data.title}`}
          />
          <Box p="0.5">
            <Heading size="md">{data.title}</Heading>
            <Text mb="5">{data?.author?.name || data?.author?.user}</Text>
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<DownloadIcon />}
                rightIcon={<ChevronDownIcon />}
              >
                Download
              </MenuButton>
              <MenuList>
                {formats.map((format) => (
                  <MenuItem
                    key={format.text}
                    onClick={() => chooseFormat(format.format, data.videoId)}
                  >
                    {format.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
