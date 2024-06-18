import React, { useState } from 'react';
import { Alert, Tooltip } from 'reactstrap';

const VideoAlert = ({ id, url, children }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Alert>
      {children}
      <Tooltip isOpen={tooltipOpen} target={'tooltip-' + id} toggle={toggle}>
        {url}
      </Tooltip>
    </Alert>
  );
};

export default VideoAlert;
