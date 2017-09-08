import React from 'react';
import { object } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card } from 'antd';

InputThematics.propTypes = {
  data: object,
};

InputThematics.defaultProps = {
  data: [],
};

function InputThematics({ data }) {
  /* eslint no-unused-vars: 0 */ // снести строку
  return <Card>fake content</Card>;
}

export default compose(pure)(InputThematics);
