import React from 'react';
import { object } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card } from 'antd';

ModelThematics.propTypes = {
  data: object,
};

ModelThematics.defaultProps = {
  data: [],
};

function ModelThematics({
  data /* eslint no-unused-vars: 0 */, // снести строку
}) {
  return <Card>fake content</Card>;
}

export default compose(pure)(ModelThematics);
