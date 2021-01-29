import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  Typography,
} from '@material-ui/core';
import { getSuggestions } from '../utils/API';

const YouTubeTrends = () => {
  const [loading, setLoading] = useState(true);
  const [trends, setTrends] = useState([]);
  const fetchTrends = async () => {
    const { data, success } = await getSuggestions('', 15);
    if (success) {
      setLoading(false);
      setTrends(data);
    } else {
      console.log('Error fetching trends');
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (loading) {
    return (
      <Box justifyContent="center" alignSelf="center">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {trends.map((trend) => {
        const { id, snippet } = trend;
        const url = `https://youtube.com/watch?v=${id.videoId}`;
        return (
          <List key={id.videoId}>
            <Box display="flex" alignItems="center" margin="0.2em">
              <Box marginRight="0.2em">
                <a href={url} target="_blank" rel="noreferrer">
                  <Avatar
                    src={`https://i.ytimg.com/vi/${id.videoId}/hqdefault.jpg`}
                    variant="square"
                  />
                </a>
              </Box>
              <Typography noWrap={true} title={snippet.title}>
                {snippet.title}
              </Typography>
            </Box>
          </List>
        );
      })}
    </>
  );
};

export default YouTubeTrends;
