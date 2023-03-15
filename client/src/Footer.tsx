import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Heading,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { EmailIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';
import { BiMailSend } from 'react-icons/bi';
import GithubIcon from './Icons/GithubIcon';
import HeartIcon from './Icons/HeartIcon';
import InstagramIcon from './Icons/InstagramIcon';
import LinkedinIcon from './Icons/LinkedinIcon';

const socialMedia = [
  {
    name: 'GitHub',
    url: 'https://github.com/bennymeier',
    icon: <GithubIcon />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/benny_meier/',
    icon: <InstagramIcon />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/benjaminmeiermedia/',
    icon: <LinkedinIcon />,
  },
];

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue('gray.200', 'gray.700')}
      rounded={'full'}
      fill={useColorModeValue('gray.700', 'white')}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      target="_blank"
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.600'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const {
    isOpen: changeLogIsOpen,
    onOpen: changeLogOnOpen,
    onClose: changeLogOnClose,
  } = useDisclosure();

  const {
    isOpen: imprintIsOpen,
    onOpen: imprintOnOpen,
    onClose: imprintOnClose,
  } = useDisclosure();

  return (
    <>
      <Box color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'full'}
          py={10}
          bg={useColorModeValue('gray.100', 'gray.900')}
        >
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '3fr 3fr' }}
            spacing={8}
          >
            <Stack spacing={6} align="flex-start">
              <Box>
                <Heading
                  className="special-elite-font"
                  color={useColorModeValue('gray.700', 'white')}
                >
                  YouTubdle
                </Heading>
              </Box>
              <Text fontSize={'sm'}>
                © {new Date().getFullYear()} YouTubdle. All rights reserved
              </Text>
              <Stack direction={'row'} spacing={6}>
                {socialMedia.map((media) => (
                  <SocialButton
                    key={media.name}
                    label={media.name}
                    href={media.url}
                  >
                    {media.icon}
                  </SocialButton>
                ))}
              </Stack>
            </Stack>
            <Stack align={'flex-end'}>
              <ListHeader>Stay up to date</ListHeader>
              <Stack direction={'row'}>
                <Input
                  placeholder={'Your email address'}
                  bg={useColorModeValue('gray.300', 'gray.700')}
                  color={useColorModeValue('white', 'gray.200')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('gray.400', 'gray.600'),
                  }}
                />
                <IconButton
                  bg={useColorModeValue('green.400', 'green.600')}
                  color={useColorModeValue('white', 'gray.800')}
                  _hover={{
                    bg: useColorModeValue('green.600', 'green.500'),
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
              <Box>
                <Button onClick={changeLogOnOpen} mr="2" mt="6">
                  Changelog
                </Button>
                <Button onClick={imprintOnOpen} mt="6">
                  Imprint
                </Button>
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
        <Container
          py="3"
          bg={useColorModeValue('gray.200', 'gray.900')}
          maxW="full"
        >
          <Box>
            <Flex alignItems="center" flexDirection="column">
              <Text>
                Made by{' '}
                <Link href="https://bennymeier-media.de" target="_blank">
                  bennymeier-media.de
                </Link>
              </Text>
              <HeartIcon
                color="red.400"
                transitionDuration="0.3s"
                _hover={{ transform: 'rotate(30deg)' }}
              />
            </Flex>
          </Box>
        </Container>
      </Box>
      <Modal onClose={changeLogOnClose} size="xl" isOpen={changeLogIsOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Changelog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm">
              {new Date('2023-03-15').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>
                Fix downloading a video once (multiple clicks will trigger only
                one download)
              </ListItem>
              <ListItem>
                Fix format problem (one dot was forgotten between title and
                format)
              </ListItem>
              <ListItem>
                Update some packages (e.g. web-vitals, framer-motion and some
                internal typing packages)
              </ListItem>
            </UnorderedList>
            <Heading size="sm">
              {new Date('2023-03-08').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>Fix infinite downloading</ListItem>
              <ListItem>Fix sound problems</ListItem>
              <ListItem>
                Update all packages (e.g. React, Chakra-Ui, ...)
              </ListItem>
            </UnorderedList>
            <Heading size="sm">
              {new Date('2022-10-12').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>
                Update all packages (e.g. React, Chakra-Ui, ...)
              </ListItem>
              <ListItem>Improve button layout</ListItem>
              <ListItem>
                Set accordion on YouTube title to show description
              </ListItem>
              <ListItem>Remove description tooltip</ListItem>
            </UnorderedList>
            <Heading size="sm">
              {new Date('2022-04-01').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>Updated all packages (e.g. React is now v18)</ListItem>
              <ListItem>
                Fixed a bug where sometimes download.htm was downloaded because
                of a missing promise
              </ListItem>
              <ListItem>Smaller download button</ListItem>
              <ListItem>Smaller menu</ListItem>
              <ListItem>Changed fontsize from 2xl to xl</ListItem>
            </UnorderedList>
            <Heading size="sm">
              {new Date('2021-12-23').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>Added Imprint</ListItem>
              <ListItem>Added loading state to button</ListItem>
              <ListItem>Added skeletons for suggestions</ListItem>
              <ListItem>Added skeleton for download preview</ListItem>
              <ListItem>Added features as hero section</ListItem>
              <ListItem>Styled some headings with new font-family</ListItem>
              <ListItem>
                Changed RegEx to find direct YouTube URLs for direct download
              </ListItem>
              <ListItem>Fixed some bugs</ListItem>
            </UnorderedList>
            <Heading size="sm">
              {new Date('2021-12-21').toLocaleDateString()}
            </Heading>
            <UnorderedList>
              <ListItem>
                New Design, switched to{' '}
                <Link href="https://chakra-ui.com/" isExternal>
                  Chakra UI <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>Added Footer</ListItem>
              <ListItem>Added Copyright</ListItem>
              <ListItem>Added Dark Mode</ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={changeLogOnClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={imprintOnClose} size="xl" isOpen={imprintIsOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imprint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm" mb="2">
              Benny Meier Media
            </Heading>
            <Text>Benjamin Meier</Text>
            <Flex alignItems="center" gridGap={2}>
              <EmailIcon />{' '}
              <Link href="mailto:hi@bennymeier-media.de">
                hi@bennymeier-media.de
              </Link>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={imprintOnClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
