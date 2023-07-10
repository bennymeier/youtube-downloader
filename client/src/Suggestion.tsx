import { ChevronDownIcon, DownloadIcon, TimeIcon } from '@chakra-ui/icons';
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
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { decodeStr, formats } from './utils/helpers';

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
        <Link
          href={`https://www.youtube.com/watch?v=${id.videoId}`}
          target="_blank"
        >
          <Image
            src={snippet.thumbnails.medium.url}
            alt={`Picture of ${snippet.title}`}
            roundedTop="lg"
          />
        </Link>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box title={snippet.title} mb="2">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton
                    fontSize="md"
                    fontWeight="semibold"
                    as="h2"
                    wordBreak="break-word"
                    lineHeight="tight"
                    _hover={{ cursor: 'pointer' }}
                    userSelect="none"
                  >
                    {decodeStr(snippet.title)}
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>{snippet.description}</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>

          <Flex
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Box color={useColorModeValue('gray.800', 'gray.100')}>
              <Box as="span" color={'gray.600'}>
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
                  label={`Published at ${new Date(
                    snippet.publishedAt
                  ).toLocaleDateString()}`}
                >
                  <Box pr="1">
                    <TimeIcon />
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
