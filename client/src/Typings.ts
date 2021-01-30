import Suggestion from './components/Suggestions/Suggestion';

export type Formats = 'mp4' | 'mp3' | 'mov' | 'flv';

export interface Suggestion {
  title: string;
  url: string;
  videoId: string;
}

export interface Download {
  title: string;
  videoId: string;
  url: string;
}

export interface Video {
    title: string;
    url: string;
    videoId: string;
    likes: number;
    dislikes: number;
    publishDate: string;
    downloadURL: string;
}
