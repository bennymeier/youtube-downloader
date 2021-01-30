import React from 'react';
import {
  Fade,
  Box,
  List,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';
import { Download } from '../../Typings';

const DownloadListItem: React.FC<Download> = (props) => {
  const { title, url, videoId } = props;
  return (
    <>
      <Fade in timeout={1000}>
        <Box>
          <List>
            <Box display="flex" alignItems="center" margin="0.2em">
              <Box marginRight="0.2em">
                <a href={url} target="_blank" rel="noreferrer">
                  <Avatar
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    variant="square"
                  />
                </a>
              </Box>
              <Typography noWrap={true} title={title}>
                {title}
              </Typography>
            </Box>
          </List>
          <Divider />
        </Box>
      </Fade>
    </>
  );
};

export default DownloadListItem;
