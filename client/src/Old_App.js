import React from 'react';
import Button from './components/Button';
import {
  getDownloadUrl,
  isYtUrl,
  isDarkMode,
  changeFormatStorage,
} from './utils/helpers';
import { getInfos, getSuggestions } from './utils/API';
import Card from './components/Card';
import Toggler from './components/Toggler';

const formats = [
  {
    id: 'mp4',
    name: 'mp4',
    isChecked: true,
  },
  {
    id: 'mp3',
    name: 'mp3',
  },
  {
    id: 'mov',
    name: 'mov',
  },
  {
    id: 'flv',
    name: 'flv',
  },
];

class App extends React.Component {
  state = {
    input: '',
    filename: '',
    downloadUrl: '',
    format: 'mp4',
    suggestions: [],
    downloads: [],
    currentVideoInfo: null,
    focus: false,
    isDark: false,
  };

  hiddenDownloadBtn = React.createRef();

  writeCss = (isDark) => {
    !isDark
      ? document.body.classList.remove('dark')
      : document.body.classList.add('dark');
  };

  changeTheme = () => {
    const isDark = isDarkMode() ? false : true;
    this.setState({ isDark: !isDark });
    localStorage.setItem('dark', `${isDark}`);
    this.writeCss(isDark);
  };

  initialTheme = () => {
    const isDark = isDarkMode();
    this.setState({ isDark }, this.writeCss(isDark));
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'format') {
        changeFormatStorage(value);
      }
    });
  };

  handleKeydown = (event) => {
    if (event.keyCode === 13) {
      this.checkInput();
    }
  };

  checkInput = () => {
    const { input } = this.state;
    if (isYtUrl(input)) {
      this.download();
    } else {
      this.fetchSuggestions();
    }
  };

  setFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  fetchSuggestions = async () => {
    const { input } = this.state;
    const { data, success } = await getSuggestions(input);
    if (success) {
      this.setState({ suggestions: data, currentVideoInfo: undefined });
      console.log(data);
    }
  };

  download = async (videoId) => {
    const { input, format } = this.state;
    const videoUrl = videoId || input;
    if (!videoUrl) return;
    const { data, success } = await getInfos(videoUrl);
    console.log('data ', data);
    if (success) {
      const downloadUrl = getDownloadUrl(videoUrl, format);
      const videoInfo = {
        title: data.videoDetails.title,
        videoId: data.videoDetails.videoId,
      };
      this.setState(
        {
          downloadUrl,
          currentVideoInfo: data.videoDetails,
          downloads: [...this.state.downloads, videoInfo],
        },
        () => {
          if (!!videoUrl) {
            this.hiddenDownloadBtn.click();
          }
        }
      );
    }
  };

  handleDownloadClick = (videoId) => {
    console.log(videoId);
    this.download(videoId);
  };

  componentDidMount() {
    this.initialTheme();
  }

  shouldSetPadding = () => {
    return window.innerWidth > 450 && this.state.downloads.length > 0;
  };

  render() {
    const { downloadUrl, focus, suggestions, currentVideoInfo } = this.state;
    return (
      <>
        <Toggler onClick={this.changeTheme} />
        <main className="container">
          <section className="search-section">
            <div className={`input-container ${focus ? 'animate' : ''}`}>
              <input
                type="text"
                name="input"
                id="text"
                placeholder="Search or paste url"
                spellCheck={false}
                autoComplete="off"
                onBlur={this.setFocus}
                onFocus={this.setFocus}
                onChange={this.handleChange}
                onKeyDown={this.handleKeydown}
                autoFocus
              />
            </div>
            <ul className="format-list">
              {formats.map((format) => {
                return (
                  <li key={format.id}>
                    <input
                      type="radio"
                      name="format"
                      value={format.name}
                      onChange={this.handleChange}
                      id={format.id}
                      checked={format.name === this.state.format}
                    />
                    <label htmlFor={format.id} className="radio-label">
                      {format.name}
                    </label>
                  </li>
                );
              })}
            </ul>
            <Button onClick={this.checkInput} />
          </section>
          {currentVideoInfo && (
            <section className="downloading-section">
              <div>
                <h2>{currentVideoInfo.title}</h2>
                <img
                  src={`https://i.ytimg.com/vi/${currentVideoInfo.videoId}/hqdefault.jpg`}
                  alt={currentVideoInfo.title}
                />
              </div>
            </section>
          )}
          <section className="suggestions-section">
            {!!suggestions.length && <h1>Suggestions</h1>}
            <div className="grid">
              {suggestions.map((video) => {
                const { snippet: s } = video;
                return (
                  <Card
                    key={video.id.videoId}
                    title={s.title}
                    videoId={video.id.videoId}
                    description={s.description}
                    thumbnailUrl={s.thumbnails.medium.url}
                    handleDownload={this.handleDownloadClick}
                  />
                );
              })}
            </div>
          </section>
        </main>
        <footer className="footer"></footer>
        <a
          href={downloadUrl}
          download
          className="hidden"
          ref={(ref) => (this.hiddenDownloadBtn = ref)}
        >
          {downloadUrl}
        </a>
      </>
    );
  }
}

export default App;
