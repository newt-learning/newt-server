import React, { useState } from "react";
import Select, { OptionsType } from "react-select";
import { Button } from "../../components";

const SelectTopicsForm = () => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  console.log(selectedOptions);

  return (
    <>
      <h4>Select topic(s)</h4>
      <Select
        isMulti
        name="topics"
        // defaultValue={selectedOptions}
        onChange={(options) => setSelectedOptions(options)}
        options={[
          { value: "space", label: "Space" },
          { value: "tech", label: "Tech " },
        ]}
        style={{ width: "100%" }}
      />
      <Button category="success">Confirm</Button>
    </>
  );
};

export default SelectTopicsForm;
