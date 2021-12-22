import {
  Container,
  Box,
  Text,
  Heading,
  VisuallyHidden,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import ConvertBox from './ConvertBox';
import Search from './Search';
import Suggestions from './Suggestions';
import {
  createDownloadStatistic,
  createSearchStatistic,
  getInfos,
  getSuggestions,
} from './utils/API';
import { getDownloadUrl, isYtUrl } from './utils/helpers';

export default function Main() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const downloadBtnRef = useRef<HTMLAnchorElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const fetchSuggestions = async () => {
    try {
      const { data } = await getSuggestions(input);
      setSuggestions(data.data);
      data.data.forEach((videoInfo: any) => {
        createSearchStatistic({
          videoId: videoInfo.id.videoId,
          channelId: videoInfo.snippet.channelId,
          channelTitle: videoInfo.snippet.channelTitle,
          publishedAt: videoInfo.snippet.publishedAt,
          title: videoInfo.title,
          searchInput: input,
        });
      });
    } catch (err) {
      setError(true);
      console.warn(err);
    }
  };
  const handleSearch = async () => {
    const isYouTubeUrl = isYtUrl(input);
    if (!input) {
      setError(true);
    } else if (isYouTubeUrl) {
      setLoading(true);
      setError(false);
    }
    if (isYouTubeUrl) {
      try {
        const { data } = await getInfos(input);
        const {
          data: { videoDetails },
        } = data;
        const { videoId, title, uploadDate, likes, category } = videoDetails;
        createDownloadStatistic({
          videoId,
          title,
          uploadDate,
          likes,
          category,
          authorId: videoDetails.author.user,
        });
        setCurrentVideo(videoDetails);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    } else {
      fetchSuggestions();
    }
  };
  const chooseFormat = async (format: string, videoId: string) => {
    try {
      await getInfos(videoId);
      const downloadUrl = getDownloadUrl(videoId, format);
      setDownloadUrl(downloadUrl);
      if (downloadBtnRef?.current) {
        setLoading(false);
        downloadBtnRef.current.click();
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <Container maxW="container.md">
        <Box textAlign="center" fontSize="xl">
          <Box mt="5" mb="5">
            <Heading>YouTube Downloader</Heading>
            <Text>
              Convert and download Youtube videos in MP4, MP3, MOV and FLV for
              free
            </Text>
          </Box>
          <Search
            handleChange={handleChange}
            handleSearch={handleSearch}
            error={error}
            input={input}
          />
          {currentVideo && !isLoading && (
            <ConvertBox data={currentVideo} chooseFormat={chooseFormat} />
          )}
          {isLoading && (
            <Stack mb="5" mt="5">
              <Skeleton height="28px" />
              <Skeleton height="28px" />
              <Skeleton height="28px" />
              <Skeleton height="28px" />
            </Stack>
          )}
        </Box>
        <Suggestions data={suggestions} chooseFormat={chooseFormat} />
      </Container>
      <VisuallyHidden>
        <a href={downloadUrl} download ref={downloadBtnRef}>
          {downloadUrl}
        </a>
      </VisuallyHidden>
    </>
  );
}
