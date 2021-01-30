import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      justifyContent: ' center',
    },
  })
);

const options = [
  { id: 'DOWNLOAD', title: 'Last downloads' },
  { id: 'TRENDS', title: 'YouTube Trends' },
];

interface Props {
  onClick: (selectedMenu: typeof options[0]) => void;
}
const SidebarMenu: React.FC<Props> = (props) => {
  const { onClick } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = useState(options[0]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setMenu(option);
    onClick(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Change sidebar menu">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Change sidebar menu"
          onClick={handleClickListItem}
        >
          <ListItemText primary={menu.title} />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === menu.id}
            onClick={() => handleMenuItemClick(option)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SidebarMenu;
