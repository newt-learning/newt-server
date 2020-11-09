import React, { useState } from "react";
import _ from "lodash";
// API
import {
  useFetchAllTopics,
  useAddContentToTopics,
  useRemoveContentFromTopics,
} from "../../api/topics";
import { useUpdateContent } from "../../api/content";
// Components
import Select from "react-select";
import { Button } from "../../components";

export type TopicSelectOptionType =
  | {
      id: string;
      value: string;
      label: string;
    }
  | undefined;
interface SelectTopicsFormProps {
  initialTopics: TopicSelectOptionType[] | [] | undefined;
  // initialTopics: any;
  contentId: string;
  closeModal: () => void;
}

const SelectTopicsForm = ({
  initialTopics,
  contentId,
  closeModal,
}: SelectTopicsFormProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(initialTopics);
  const { data: allTopics, isLoading } = useFetchAllTopics();
  const [updateContent, { isLoading: contentIsUpdating }] = useUpdateContent();
  const [
    addContentToTopics,
    { isLoading: isAddingTopics },
  ] = useAddContentToTopics();
  const [
    removeContentFromTopics,
    { isLoading: isRemovingTopics },
  ] = useRemoveContentFromTopics();

  const formattedTopics = allTopics?.map((topic: any) => ({
    id: topic._id,
    value: topic.name,
    label: topic.name,
  }));

  // Pretty much identical to mobile
  const handleSubmit = async () => {
    // Only get the topic ids from the selected options
    const selectedTopicsIds = selectedOptions?.map((option: any) => option.id);
    const initialTopicsIds = _.map(
      initialTopics,
      (topic: TopicSelectOptionType) => topic?.id
    );

    console.log(initialTopicsIds);

    let topicsToAdd: any = [];
    let topicsToRemove: any = [];

    // For each of the topics selected, if they're not in the existing topics,
    // only then add it to the topicsToAdd array. Only those topics will then
    // have the content added to it to avoid duplication.
    selectedTopicsIds.forEach((topicId: string) => {
      if (!_.includes(initialTopicsIds, topicId)) {
        topicsToAdd.push(topicId);
      }
    });

    // For each of the existing topics, if they're not in the selected topics,
    // then add it to the topicsToRemove array. It will be used to remove the
    // topic <==> content associations.
    initialTopicsIds.forEach((topicId: string | undefined) => {
      if (!_.includes(selectedTopicsIds, topicId)) {
        topicsToRemove.push(topicId);
      }
    });

    // Send request to add the content to the newly selected topics, remove
    // topics that were unselected, and update the content by adding the topics
    // to it
    updateContent({ contentId, data: { topics: selectedTopicsIds } });
    await addContentToTopics({ topicIds: topicsToAdd, contentId });
    await removeContentFromTopics({ topicIds: topicsToRemove, contentId });

    // Close modal -- maybe I should move this whole handler to the parent, how
    // I usually do
    closeModal();
  };

  const colorStyles = {
    option: (styles: any, { isFocused }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#ffeff3" : "white",
      };
    },
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: "#ffeff3",
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#ff386b",
      fontSize: "1rem",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#ff386b",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#ff386b",
        color: "#ffeff3",
      },
    }),
  };

  return (
    <>
      <h4>Select topic(s)</h4>
      <Select
        isMulti
        name="topics"
        defaultValue={selectedOptions}
        onChange={(options) => setSelectedOptions(options)}
        options={formattedTopics}
        closeMenuOnSelect={false}
        isLoading={isLoading}
        styles={colorStyles}
        style={{ width: "100%" }}
      />
      <Button
        category="success"
        onClick={handleSubmit}
        isLoading={contentIsUpdating || isAddingTopics || isRemovingTopics}
        style={{
          display: "flex",
          margin: "1rem auto",
          justifyContent: "center",
          width: "40%",
        }}
      >
        Confirm
      </Button>
    </>
  );
};

export default SelectTopicsForm;
