import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Image,
  Text,
  Flex,
  DrawerFooter,
  DrawerCloseButton,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { formatSecondsToMinutesAndSeconds } from './utils/helpers';

export interface HistoryItem {
  imageUrl: string;
  title: string;
  format: string;
  date: Date;
  videoLength: string;
}

const DownloadHistoryItem: React.FC<{ item: HistoryItem }> = React.memo(
  ({ item }) => (
    <Box p={2} overflow="hidden">
      <Flex align="center">
        <Image
          src={item.imageUrl}
          alt={item.title}
          max-width="100px"
          width="100px"
          height="auto"
          mr={2}
        />
        <VStack spacing={1} align="flex-start">
          <Text
            fontWeight="bold"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxWidth="170px"
            title={item.title}
          >
            {item.title}
          </Text>
          <Text fontSize="xs">
            Length:{' '}
            {formatSecondsToMinutesAndSeconds(parseInt(item.videoLength))}
          </Text>
          <Text fontSize="xs" title={new Date(item.date).toUTCString()}>
            Downloaded: {new Date(item.date).toLocaleDateString()}
          </Text>
        </VStack>
      </Flex>
    </Box>
  )
);

interface SidebarProps {
  historyData: HistoryItem[];
  handleDeleteHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { handleDeleteHistory, historyData = [] } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={toggleSidebar}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Download History</DrawerHeader>
            <Divider borderBottomWidth="2px" />
            <DrawerBody p="2">
              <VStack spacing={4} align="stretch">
                {!!!historyData.length && (
                  <Heading textAlign="center" userSelect="none">
                    Empty History
                    <DownloadIcon width="75px" height="75px" />
                  </Heading>
                )}
                {historyData.map((item, index) => (
                  <Box key={index}>
                    <DownloadHistoryItem item={item} />
                    <Divider />
                  </Box>
                ))}
              </VStack>
            </DrawerBody>
            <DrawerFooter
              paddingTop="4"
              paddingBottom="4"
              paddingInlineStart="unset"
              paddingInlineEnd="unset"
              justifyContent="space-around"
            >
              <Button
                size="sm"
                onClick={handleDeleteHistory}
                leftIcon={<DeleteIcon />}
              >
                Clear History
              </Button>
              <Text userSelect="none">
                {historyData.length} Total Downloads
              </Text>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Box position="fixed" bottom="20px" right="20px" zIndex="10">
        <Button
          onClick={toggleSidebar}
          size="sm"
          leftIcon={<DownloadIcon />}
          colorScheme="green"
        >
          Download History
        </Button>
      </Box>
    </>
  );
};

export default Sidebar;
