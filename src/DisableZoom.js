import React from 'react';
import { Helmet } from 'react-helmet';

const DisableZoom = () => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </Helmet>
  );
};

export default DisableZoom;
