import React from "react";
import MDViewer from ".";

export default {
  Component: MDViewer,
  title: "Atoms/MDViewer",
};

export const Default = () => {
  return (
    <MDViewer
      content="
    # 안승재
    ```javascript
      console.log('sdfg');
    ```
  
  "
    />
  );
};
