import React, { useState } from 'react';
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
  Fade,
  useMediaQuery,
} from '@material-ui/core';
import SidebarMenu from './SidebarMenu';
import YouTubeTrends from './YouTubeTrends';
import { v4 } from 'uuid/';

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
  const [menu, setMenu] = useState('DOWNLOAD');
  const handleMenuChange = (selectedMenu: any) => {
    setMenu(selectedMenu.id);
  };

  if (matches) {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <SidebarMenu onClick={handleMenuChange} />
        {menu === 'TRENDS' && <YouTubeTrends />}
        {menu === 'DOWNLOAD' &&
          downloads.map((download, index) => {
            const { title, url, videoId } = download;
            return (
              <Fade in key={v4()} timeout={1000}>
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
                  {index >= 0 && <Divider />}
                </Box>
              </Fade>
            );
          })}
      </Drawer>
    );
  }
  return null;
};

export default withStyles(styles)(Sidebar);
