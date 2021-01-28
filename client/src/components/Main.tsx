import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  main: {
    width: '100%',
  },
});

type Props = WithStyles<typeof styles>;

const Main: React.FC<Props> = (props) => {
  const { children, classes } = props;
  return <main className={classes.main}>{children}</main>;
};

export default withStyles(styles)(Main);
