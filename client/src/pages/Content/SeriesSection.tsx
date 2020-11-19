import React, { useState, useEffect } from "react";
import _ from "lodash";
// API
import { useUpdateContent } from "../../api/content";
// Components
import Select from "react-select";
import { FiCheck } from "react-icons/fi";
import { Button, IFrame, ProgressBar } from "../../components";
// Styling
import styles from "./SeriesSection.module.css";
import parentStyles from "./ContentFlow.module.css";
// Types
import { ShelfType } from "./ContentFlow";
import { figureOutShelfMovingDataChanges } from "./helpers";

interface SeriesSectionProps {
  id: string;
  content: any[] | undefined;
  shelf: ShelfType;
}

const SeriesSection = ({ id, content, shelf }: SeriesSectionProps) => {
  const formattedContent = content?.map((item: any) => ({
    id: item?._id,
    value: item?.name,
    label: item?.name,
  }));

  const [selectedContent, setSelectedContent] = useState<any>(null);

  const [updateContent, { isLoading: isUpdatingContent }] = useUpdateContent();

  const numCompleted = _.filter(content, { shelf: "Finished Learning" }).length;
  const totalVideos = content?.length;
  const percentComplete =
    _.isNumber(numCompleted) && _.isNumber(totalVideos)
      ? Math.round((numCompleted / totalVideos) * 100)
      : undefined;

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

  // Go to the next video in the series
  const handleGoToNextVideo = () => {
    // Get current index and add 1 for next video
    const currentVideoIndex = _.findIndex(formattedContent, {
      id: selectedContent.id,
    });
    const nextVideoIndex = currentVideoIndex + 1;

    // If the index isn't overshot (past the total number of videos), change
    // currently selected video to that
    if (formattedContent && nextVideoIndex < formattedContent.length) {
      setSelectedContent(formattedContent[nextVideoIndex]);
    }
  };

  // Mark the current video as "Finished Learning", or go back to "Currently Learning"
  // if it's already finished
  const handleMarkAsComplete = async () => {
    // Get current shelf and start/finish dates of content
    const currentShelf = _.filter(content, { _id: selectedContent?.id })[0]
      ?.shelf;

    // If the video has already been completed, only change the shelf to Currently
    // Learning. Don't do the start/finish stuff so it doesn't add new sessions,
    // and some videos are out of sync with (some have more/some less) the rest of the series.
    // Otherwise, do the usual.
    if (currentShelf === "Finished Learning") {
      await updateContent({
        contentId: selectedContent?.id,
        data: {
          shelf: "Currently Learning",
        },
      });
    } else {
      const startFinishDates = _.filter(content, {
        _id: selectedContent?.id,
      })[0]?.startFinishDates;
      const updateData = figureOutShelfMovingDataChanges(
        currentShelf,
        "Finished Learning",
        {
          startFinishDates,
        }
      );

      await updateContent({ contentId: selectedContent?.id, data: updateData });
    }
  };

  return (
    <div className={styles.container}>
      {/* Show series progress bar in Currently/Finished Learning shelves */}
      {shelf !== "Want to Learn" && _.isNumber(percentComplete) ? (
        <div className={styles.progressContainer}>
          <ProgressBar
            percentComplete={percentComplete}
            containerStyle={{ marginBottom: 0 }}
          />
          {totalVideos ? (
            <div
              className={styles.progressTotal}
            >{`${numCompleted} / ${totalVideos}`}</div>
          ) : null}
        </div>
      ) : null}
      <h4>Select video</h4>
      <Select
        id={`series-contents-${id}`}
        name={`series-contents-${id}`}
        options={formattedContent}
        value={selectedContent}
        onChange={(option) => setSelectedContent(option)}
      />
      <div
        className={parentStyles.videoContainer}
        style={{ marginTop: "1rem" }}
      >
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
      <div className={styles.buttonsContainer}>
        {/* Only show 'Mark as Complete' button if in Currently/Finished shelf */}
        {shelf === "Currently Learning" || shelf === "Finished Learning" ? (
          <Button
            category={
              _.filter(content, { _id: selectedContent?.id })[0]?.shelf ===
              "Finished Learning"
                ? "success"
                : "secondary"
            }
            onClick={handleMarkAsComplete}
            isLoading={isUpdatingContent}
          >
            {_.filter(content, { _id: selectedContent?.id })[0]?.shelf ===
            "Finished Learning" ? (
              <>
                Completed{" "}
                <FiCheck
                  size={17}
                  style={{ verticalAlign: "top", marginLeft: "0.25rem" }}
                />
              </>
            ) : (
              `Mark as Complete`
            )}
          </Button>
        ) : null}
        <Button
          onClick={handleGoToNextVideo}
          className={styles.nextButton}
          // Make this more readable
          isDisabled={
            formattedContent &&
            _.findIndex(formattedContent, { id: selectedContent?.id }) ===
              formattedContent?.length - 1
          }
        >
          Next video
        </Button>
      </div>
    </div>
  );
};

export default SeriesSection;
