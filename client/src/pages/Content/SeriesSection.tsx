import React, { useState, useEffect } from "react";
import _ from "lodash";
import Select, { ValueType } from "react-select";
import { IFrame } from "./ContentFlow";
import styles from "./ContentFlow.module.css";

interface SeriesSectionProps {
  id: string;
  content: any[] | undefined;
}

const SeriesSection = ({ id, content }: SeriesSectionProps) => {
  const formattedContent = content?.map((item: any) => ({
    id: item?._id,
    value: item?.name,
    label: item?.name,
  }));

  const [selectedContent, setSelectedContent] = useState<any>(null);

  // This ensures that the selected value changes once you click on a different series.
  // Otherwise, the selected option is still from the old series (i.e. the options
  // are updated, but the one's that selected is not). This ensures each series
  // has it's own Select component, basically
  useEffect(() => {
    if (id) {
      setSelectedContent(formattedContent ? formattedContent[0] : null);
    }
    return () => setSelectedContent(null);
  }, [id]);

  return (
    <div>
      <h4>Select video</h4>
      <Select
        id={`series-contents-${id}`}
        name={`series-contents-${id}`}
        options={formattedContent}
        value={selectedContent}
        onChange={(option) => setSelectedContent(option)}
      />
      <div className={styles.videoContainer} style={{ marginTop: "1rem" }}>
        <IFrame
          // The key ensures the component is recreated. Otherwise just changing the
          // src doesn't sometimes refresh the video.
          // Also this filter stuff looks horrifying, maybe need to rethink this
          key={_.filter(content, { _id: selectedContent?.id })[0]?._id}
          title={_.filter(content, { _id: selectedContent?.id })[0]?.name}
          src={
            _.filter(content, { _id: selectedContent?.id })[0]
              ? `https://www.youtube.com/embed/${
                  _.filter(content, { _id: selectedContent?.id })[0].videoInfo
                    ?.videoId
                }`
              : ""
          }
        />
      </div>
    </div>
  );
};

export default SeriesSection;
