import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
const SpinnerComponent = (props) => {
  const [progress, setProgress] = useState(99.99);
  return (
    <React.Fragment>
      <LoadingBar
        color="#f89a35e7"
        height="2"
        loaderSpeed="2000"
        transitionTime="2500"
        progress={progress}
        onLoaderFinished={() => setProgress(99.99)}
      />
    </React.Fragment>
  )
}
export default SpinnerComponent;