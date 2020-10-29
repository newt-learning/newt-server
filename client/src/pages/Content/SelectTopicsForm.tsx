import React, { useState } from "react";
import { useFetchAllTopics } from "../../api/topics";
import Select from "react-select";
import { Button } from "../../components";

interface SelectTopicsFormProps {
  initialTopics: any;
}

const SelectTopicsForm = ({ initialTopics }: SelectTopicsFormProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const { data: allTopics, isLoading } = useFetchAllTopics();
  const formattedTopics = allTopics?.map((topic: any) => ({
    id: topic._id,
    value: topic.name,
    label: topic.name,
  }));

  const handleSubmit = () => {
    // Only get the topic ids from the selected options
    const selectedTopicsIds = selectedOptions.map((option: any) => option.id);

    console.log(selectedTopicsIds);
  };

  return (
    <>
      <h4>Select topic(s)</h4>
      <Select
        isMulti
        name="topics"
        // defaultValue={selectedOptions}
        onChange={(options) => setSelectedOptions(options)}
        options={formattedTopics}
        closeMenuOnSelect={false}
        isLoading={isLoading}
        style={{ width: "100%" }}
      />
      <Button category="success" type="submit" onClick={handleSubmit}>
        Confirm
      </Button>
    </>
  );
};

export default SelectTopicsForm;
