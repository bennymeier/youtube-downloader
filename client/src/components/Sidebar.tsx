import React from 'react';
import {
  Drawer,
  Divider,
  List,
  Box,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      height: '100vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  });
export interface Downloads {
  title: string;
  videoId: string;
  url: string;
}

interface Props extends WithStyles {
  downloads: Downloads[];
}

const Sidebar: React.FC<Props> = (props) => {
  const { classes, downloads } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  if (matches) {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <p>{matches}</p>
        {downloads.map((download, index) => {
          const { title, url, videoId } = download;
          return (
            <>
              <List key={videoId}>
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
              {index >= 0 && <Divider />}
            </>
          );
        })}
      </Drawer>
    );
  }
  return null;
};

export default withStyles(styles)(Sidebar);
