import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const GenericTooltip = ({
  placement,
  content,
  children
}) => {

  return (
    <OverlayTrigger
      placement={ placement }
      overlay={
        <Tooltip id={`tooltip-${placement}`}>
          { content }
        </Tooltip>
      }
    >
      { children }
    </OverlayTrigger>
  );
};

export default GenericTooltip;
