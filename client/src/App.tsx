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
import Sidebar from './components/Sidebar/Sidebar';
import SearchContainer from './components/SearchContainer';
import {
  getDownloadHistory,
  getDownloadUrl,
  getFormat,
  isYtUrl,
  setDownloadHistory,
} from './utils/helpers';
import { getInfos, getSuggestions } from './utils/API';
import CurrentVideo from './components/CurrentVideo';
import SuggestionsContainer from './components/Suggestions/SuggestionsContainer';
import SpotifyLogin from './components/Spotify/SpotifyLogin';
import { Download, Formats, Suggestion, Video } from './Typings';

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
  downloads: Download[];
  searchString: string;
  downloadURL: string;
  currentVideo: Video;
  format: Formats;
  suggestions: Suggestion[];
}
class App extends React.Component<Props, State> {
  private hiddenDownloadBtn = React.createRef<HTMLAnchorElement>();
  state: State = {
    downloads: [],
    searchString: '',
    downloadURL: '',
    currentVideo: null,
    format: 'mp4',
    suggestions: [],
  };

  componentDidMount = () => {
    const downloadHistory = getDownloadHistory();
    if (downloadHistory) {
      this.setState({ downloads: downloadHistory });
    }
    const format = getFormat() as Formats;
    if (format) {
      this.setState({ format });
    }
  };

  search = (searchString: string, format: Formats) => {
    const isYTUrl = isYtUrl(searchString);
    this.setState({ searchString, format }, () => {
      if (isYTUrl) {
        this.downloadVideo();
      } else {
        this.fetchSuggestions();
      }
    });
  };

  fetchSuggestions = async () => {
    const { searchString } = this.state;
    const { data, success } = await getSuggestions(searchString);
    if (success) {
      const videoInfos = data.map((video) => {
        return { videoId: video.id.videoId, title: video.snippet.title };
      });
      this.setState({ suggestions: videoInfos });
    }
  };

  getVideoInfos = async () => {
    const { searchString } = this.state;
    const { data, success } = await getInfos(searchString);
    if (success) {
      const videoInfos = {
        title: data.videoDetails.title,
        url: data.videoDetails.video_url,
        likes: data.videoDetails.likes,
        dislikes: data.videoDetails.dislikes,
        publishDate: data.videoDetails.publishDate,
        videoId: data.videoDetails.videoId,
        downloadURL: this.state.downloadURL,
      };
      const downloads = [videoInfos, ...this.state.downloads];
      this.setState(
        {
          currentVideo: videoInfos,
          downloads,
        },
        () => {
          setDownloadHistory(videoInfos);
        }
      );
    }
  };

  downloadVideo = () => {
    const { searchString, format } = this.state;
    const downloadURL = getDownloadUrl(searchString, format);
    this.setState({ downloadURL }, () => {
      this.hiddenDownloadBtn.current.click();
      this.getVideoInfos();
    });
  };

  downloadSuggestion = (url: string, format: Formats) => {
    this.setState({ searchString: url, format }, () => this.downloadVideo());
  };

  render() {
    const { classes } = this.props;
    const { downloads, downloadURL, currentVideo, suggestions } = this.state;

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <Sidebar downloads={downloads} />
          <Main>
            <Container maxWidth="lg" className={classes.container}>
              <CurrentVideo {...currentVideo} />
              <SpotifyLogin />
              <SearchContainer handleSearch={this.search} />
              <SuggestionsContainer
                suggestions={suggestions}
                onClick={this.downloadSuggestion}
              />
            </Container>
          </Main>
        </div>
        <a
          href={downloadURL}
          download
          className="hidden"
          ref={this.hiddenDownloadBtn}
        >
          {downloadURL}
        </a>
      </>
    );
  }
}

export default withStyles(styles)(App);
