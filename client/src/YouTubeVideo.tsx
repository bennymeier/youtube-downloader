import React, { useEffect, useRef } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  autoplay?: boolean;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  autoplay = false,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    const onPlayerReady = (event: any) => {
      if (autoplay) {
        event.target.playVideo();
      }
    };
    // @ts-ignore
    playerInstanceRef.current = new YT.Player(playerRef.current!, {
      height: '150',
      width: '200',
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
      },
    });

    // Aufräumen
    return () => {
        playerInstanceRef.current?.destroy();
    };
  }, [videoId, autoplay]);

  const handleMouseEnter = () => {
    playerInstanceRef.current.playVideo();
  };

  const handleMouseLeave = () => {
    playerInstanceRef.current.pauseVideo();
  };

  return (
    <div
      id={`youtube-player_${videoId}`}
      ref={playerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default YouTubeVideo;
