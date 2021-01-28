import React from "react";

const Sidebar = ({ videos }) => {
  return (
    <>
      <aside className="sidebar">
        <ul>
          {videos.map((video) => {
            return (
              <li key={video.videoId}>
                <img
                  src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                  alt={video.title}
                  width="75"
                />
                <div className="title">{video.title}</div>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
