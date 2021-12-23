import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import {
  FcFlashOn,
  FcClock,
  FcDocument,
  FcMultipleDevices,
  FcLock,
} from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcClock} w={10} h={10} />}
          title={'Fast and easy to use'}
          text={`Using our YouTube downloader is the fastest and easiest way to download and save any YouTube video to MP3 or MP4. 
            Simply copy YouTube URL, paste it on the search box and click on "Convert" button. No register/accounts needed.`}
        />
        <Feature
          icon={<Icon as={FcFlashOn} w={10} h={10} />}
          title={'Without limitation'}
          text={`Download and convert YouTube videos as much as you want without limitation and always free.`}
        />
        <Feature
          icon={<Icon as={FcMultipleDevices} w={10} h={10} />}
          title={'Full platforms supported'}
          text={`We support all device platforms. Easy to convert YouTube videos to MP3 files regardless of whether you are using Windows, Mac or Linux, Android or iOS.`}
        />
        <Feature
          icon={<Icon as={FcDocument} w={10} h={10} />}
          title={'Full file format supported'}
          text={`We support all video and audio formats conversion. You can easily convert YouTube videos to MP3, MP4, MOV and FLV.`}
        />
        <Feature
          icon={<Icon as={FcLock} w={10} h={10} />}
          title={'100% Safe and Clean'}
          text={`With the rising awareness of device security, people attach great importance to personal data.
          The service is totally clean with no virus under intense supervision based on security database.`}
        />
      </SimpleGrid>
    </Box>
  );
}
