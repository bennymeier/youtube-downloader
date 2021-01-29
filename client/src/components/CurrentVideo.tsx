import React from 'react';
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  makeStyles,
  IconButton,
  Typography,
  Fade,
} from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface Props {
  title: string;
  url: string;
  videoId: string;
  likes: number;
  dislikes: number;
  publishDate: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '1em',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 350,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const CurrentVideo: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { title, url, videoId } = props;
  if (!title || !videoId) {
    return null;
  }
  return (
    <Fade in timeout={1000}>
      <Card className={classes.root} raised>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary"></Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          title={title}
        />
      </Card>
    </Fade>
  );
};

export default CurrentVideo;
