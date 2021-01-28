import React from 'react';
import {
  Drawer,
  Divider,
  List,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      height: "100vh",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  });
export interface Downloads {
  title: string;
  artist: string;
}

interface Props extends WithStyles {
  downloads: Downloads[];
}

const Sidebar: React.FC<Props> = (props) => {
  const { classes, downloads } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open
    >
      <Divider />
      {downloads.map((download, index) => {
        return (
          <List>
            {download.title} - {download.artist}
          </List>
        );
      })}
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
