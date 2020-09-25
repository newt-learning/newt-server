import React from "react";

interface YoutubeConfirmationProps {
  dataType: "video" | "playlist"; // Youtube data type
  data: any;
}

const YoutubeConfirmation = ({ dataType, data }: YoutubeConfirmationProps) => {
  return (
    <div>
      <p>{JSON.stringify(dataType)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default YoutubeConfirmation;
