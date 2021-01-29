import React from 'react';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

interface Props {
  downloadURL: string;
}
interface State {
  play: boolean;
  audio: HTMLAudioElement;
}
class PlayPauseButton extends React.Component<Props, State> {
  state: State = {
    play: false,
    audio: null,
  };

  componentDidMount() {
    this.setState(
      { play: false, audio: new Audio(this.props.downloadURL) },
      () => {
        this.state.audio.addEventListener('ended', () => {
          this.setState({ play: false });
        });
      }
    );
  }

  componentWillUnmount() {
    this.state.audio.removeEventListener('ended', () =>
      this.setState({ play: false })
    );
  }

  playVideo() {
    this.setState({ play: true }, () => {
      this.state.audio.play();
    });
  }

  stopVideo() {
    this.setState({ play: false }, () => {
      this.state.audio.pause();
    });
  }

  handleClick = () => {
    this.setState({ play: !this.state.play }, () => {
      if (!this.state.play) {
        this.stopVideo();
      } else {
        this.playVideo();
      }
    });
  };

  render() {
    const { play } = this.state;
    return (
      <>
        <IconButton aria-label="play/pause" onClick={this.handleClick}>
          {play ? (
            <PauseIcon style={{ height: 38, width: 38 }} />
          ) : (
            <PlayArrowIcon style={{ height: 38, width: 38 }} />
          )}
        </IconButton>
      </>
    );
  }
}

export default PlayPauseButton;
