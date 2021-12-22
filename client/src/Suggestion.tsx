import {
  ChevronDownIcon,
  DownloadIcon,
  InfoOutlineIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Tooltip,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { formats } from './utils/helpers';

interface Props {
  data: any;
  chooseFormat: (format: string, videoId: string) => void;
}

export default function Suggestion(props: Props) {
  const {
    chooseFormat,
    data: { snippet, id },
  } = props;
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={snippet.thumbnails.medium.url}
          alt={`Picture of ${snippet.title}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              title={snippet.title}
            >
              {snippet.title}
            </Box>
          </Flex>

          <Flex
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Box
              fontSize="2xl"
              color={useColorModeValue('gray.800', 'gray.100')}
            >
              <Box as="span" color={'gray.600'} fontSize="lg">
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={<DownloadIcon />}
                    rightIcon={<ChevronDownIcon />}
                    color={useColorModeValue('gray.800', 'white')}
                  >
                    Download
                  </MenuButton>
                  <MenuList color={useColorModeValue('gray.800', 'gray.100')}>
                    {formats.map((format) => (
                      <MenuItem
                        key={format.text}
                        onClick={() => chooseFormat(format.format, id.videoId)}
                      >
                        {format.text}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Box>
              <Flex>
                <Tooltip
                  label={`Published at: ${new Date(
                    snippet.publishedAt
                  ).toLocaleDateString()}`}
                >
                  <Box pr="1">
                    <TimeIcon />
                  </Box>
                </Tooltip>
                <Tooltip label={`Description: ${snippet.description}`}>
                  <Box>
                    <InfoOutlineIcon />
                  </Box>
                </Tooltip>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
