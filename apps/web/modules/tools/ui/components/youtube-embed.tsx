"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps) => {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        wrapperClass="yt-lite rounded-2xl"
        playerClass="lty-playbtn"
        iframeClass="rounded-2xl"
        params="rel=0&modestbranding=1"
        poster="hqdefault"
        webp
      />
    </div>
  );
};
