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
import { StarIcon } from '@chakra-ui/icons';

const features = [
  {
    id: 1,
    title: `Pagination (currently only 5 videos are shown)`,
  },
  {
    id: 2,
    title: `Playlist-Downloads`,
  },
  {
    id: 3,
    title: `Show progressbar for download-state`,
  },
  {
    id: 4,
    title: `Quality choice (480p, 720p, 1080p, 4k)`,
  },
  {
    id: 5,
    title: `Download History (safe in cache)`,
  },
  {
    id: 6,
    title: `Fast batch download (insert multiple urls and download automatically)`,
  },
  {
    id: 7,
    title: `Preview video before download`,
  },
  {
    id: 8,
    title: `Edit start and end points of a video`,
  },
  {
    id: 9,
    title: `Contact form for submitting features or bugs`,
  },
  {
    id: 10,
    title: `Deploy a chrome extension (possible? allowed?)`,
  },
  { id: 11, title: `Electron desktop app (.exe file downloadable)` },
];

function FeaturesComingSoon() {
  return (
    <Box p={4}>
      <Stack spacing={2} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Coming Soon</Heading>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} spacing={5}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={StarIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default FeaturesComingSoon;
