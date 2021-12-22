export const isYtUrl = (url: string) => {
  const ytRegex = new RegExp(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/g
  );
  return ytRegex.test(url);
};

export const isLocalHost = window.location.hostname === 'localhost';

export const host = isLocalHost
  ? 'http://localhost:4000'
  : `https://${window.location.hostname}`;

export const getDownloadUrl = (videoId: string, format = 'mp4') =>
  `${host}/watch?v=${videoId}&format=${format}`;

export const formats = [
  { text: 'MP4', format: '.mp4' },
  { text: 'MP3', format: '.mp3' },
  { text: 'MOV', format: '.mov' },
  { text: 'FLV', format: '.flv' },
];
