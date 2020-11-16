import React, { useState, useEffect } from "react";
import Select, { ValueType } from "react-select";

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

  const [selectedContent, setSelectedContent] = useState<ValueType<{
    id: any;
    value: any;
    label: any;
  }> | null>(formattedContent ? formattedContent[0] : null);

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
      <Select
        id={`series-contents-${id}`}
        name={`series-contents-${id}`}
        options={formattedContent}
        value={selectedContent}
        onChange={(option) => setSelectedContent(option)}
      />
    </div>
  );
};

export default SeriesSection;
