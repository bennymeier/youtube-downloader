import React from 'react';
import {
  Container,
  CssBaseline,
  createStyles,
  withStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import Main from './components/Main';
import Sidebar, { Downloads } from './components/Sidebar';
import SearchContainer from './components/SearchContainer';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

type Props = WithStyles<typeof styles>;
interface State {
  downloads: Downloads[];
}
class App extends React.Component<Props, State> {
  state = {
    downloads: [],
  };
  render() {
    const { classes } = this.props;
    const { downloads } = this.state;

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <Sidebar downloads={downloads} />
          <Main>
            <Container maxWidth="lg" className={classes.container}>
              <SearchContainer />
            </Container>
          </Main>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(App);
