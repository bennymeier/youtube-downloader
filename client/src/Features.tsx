import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const features = [
  {
    id: 1,
    title: 'Fast and easy to use',
    text: `Using our YouTube downloader is the fastest and easiest way to download and save any YouTube video to MP3 or MP4. 
    Simply copy YouTube URL, paste it on the search box and click on "Convert" button. No register/accounts needed.`,
  },
  {
    id: 2,
    title: 'Without limitation',
    text: `Download and convert YouTube videos as much as you want without limitation and always free.`,
  },
  {
    id: 3,
    title: 'Full platforms supported',
    text: `We support all device platforms. Easy to convert YouTube videos to MP3 files regardless of whether you are using Windows, Mac or Linux, Android or iOS.`,
  },
  {
    id: 4,
    title: 'Full file format supported',
    text: `We support all video and audio formats conversion. You can easily convert YouTube videos to MP3, MP4, MOV and FLV.`,
  },
  {
    id: 5,
    title: '100% Safe and Clean',
    text: `With the rising awareness of device security, people attach great importance to personal data.
    The service is totally clean with no virus under intense supervision based on security database.`,
  },
];

function Features() {
  return (
    <Box p={4}>
      <Stack spacing={2} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Features</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          There are already some features that have been implemented. More
          coming soon! You can find more below.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Features;
