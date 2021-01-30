import React from 'react';
import {
  makeStyles,
  Card,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import FormatsMenu from '../Formats/FormatsMenu';
import { Suggestion as SuggestionType } from '../../Typings';

interface Props extends SuggestionType {
  onClick: (url: string, format: string) => void;
}
const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
});
const Suggestion: React.FC<Props> = (props) => {
  const { title, videoId, onClick } = props;
  const url = `https://youtube.com/watch?v=${videoId}`;

  const classes = useStyles();
  const handleFormat = (format) => {
    onClick(url, format);
  };

  return (
    <Box margin="1em">
      <Card className={classes.root} raised>
        <CardActionArea href={url} rel="noreferrer" target="_blank">
          <CardMedia
            className={classes.media}
            image={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            title={title}
          />
        </CardActionArea>
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
        <CardActions>
          <FormatsMenu onClick={handleFormat} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default Suggestion;
