import React, { useState } from 'react';
import {
  Drawer,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import SidebarMenu from './SidebarMenu';
import YouTubeTrends from './YouTubeTrends';
import { v4 } from 'uuid/';
import DownloadListItem from './DownloadListItem';
import { Download } from '../../Typings';

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

interface Props extends WithStyles {
  downloads: Download[];
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
          downloads.map((download) => {
            return <DownloadListItem key={v4()} {...download} />;
          })}
      </Drawer>
    );
  }
  return null;
};

export default withStyles(styles)(Sidebar);
