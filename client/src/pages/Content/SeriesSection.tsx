import React from "react";
import Select from "react-select";

interface SeriesSectionProps {
  content: any[] | undefined;
}

const SeriesSection = ({ content }: SeriesSectionProps) => {
  return <div>{JSON.stringify(content)}</div>;
};

export default SeriesSection;
