import React from "react";

interface IFrameProps {
  title: string;
  src: string;
}

// Currently just for YouTube videos
const IFrame = ({ title, src }: IFrameProps) => (
  <iframe
    id="ytplayer"
    title={title}
    width="640"
    height="360"
    src={src}
    frameBorder="0"
    allowFullScreen
  />
);

export default IFrame;
