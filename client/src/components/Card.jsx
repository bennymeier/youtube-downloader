import React from "react";
import { getRandomEmoji } from "./../utils/helpers";

const Card = ({
  title,
  videoId,
  description,
  thumbnailUrl,
  handleDownload,
}) => {
  return (
    <>
      <div className="card">
        <a
          href={`https://youtube.com/watch?v=${videoId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="image"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          ></div>
          <div className="title">{title}</div>
        </a>
        <button onClick={() => handleDownload(videoId)} className="download">
          Download {getRandomEmoji()}
        </button>
      </div>
    </>
  );
};

export default React.memo(Card);
