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
  Divider,
  Badge,
  Text,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  decodeStr,
  formats,
  formatSecondsToMinutesAndSeconds,
} from './utils/helpers';

interface Props {
  data: any;
  chooseFormat: (format: string, videoId: string) => void;
}

export default function SuggestionV2(props: Props) {
  const {
    chooseFormat,
    data: { snippet, id },
  } = props;
  return (
    <Card
      borderRadius="lg"
      borderStyle="solid"
      borderWidth="2px"
      borderColor={useColorModeValue('gray.100', 'gray.600')}
    >
      <CardHeader>
        <Heading marginBottom="1" size="md">
          {decodeStr(snippet.title)}
        </Heading>
        <Text fontSize="small" wordBreak="break-word" lineHeight="tight">
          {snippet.description}
        </Text>
      </CardHeader>
      <Divider color="gray.600" opacity={useColorModeValue('1', '0.6')} />
      <CardBody>
        <Box marginBottom="4">
          <Flex>
            {/* <Badge>
              Length: {formatSecondsToMinutesAndSeconds(snippet.lengthSeconds)}
            </Badge> */}
            <Badge textTransform="none">
              Uploaded: {new Date(snippet.publishedAt).toLocaleDateString()}
            </Badge>
          </Flex>
        </Box>
        <Image
          src={snippet.thumbnails.medium.url}
          alt={`Picture of ${snippet.title}`}
          title={`Picture of ${snippet.title}`}
          borderRadius="lg"
        />
      </CardBody>
      <CardFooter
        backgroundColor={useColorModeValue('gray.100', 'gray.600')}
        borderBottomRadius="lg"
      >
        <ButtonGroup
          gap="1"
          flexWrap="wrap"
          justifyContent="space-between"
          width="100%"
        >
          <Menu>
            <MenuButton
              background={useColorModeValue('gray.300', 'gray.700')}
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
          <Button
            background={useColorModeValue('gray.300', 'gray.700')}
            rel="noreferrer"
            href={`https://www.youtube.com/watch?v=${id.videoId}`}
            target="_blank"
            as="a"
            marginInlineStart="0 !important"
          >
            Open YouTube
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
