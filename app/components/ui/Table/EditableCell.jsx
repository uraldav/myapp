import React from 'react';
import { Input } from 'antd';
import { string, bool, func } from 'prop-types';
import { compose, withHandlers, pure } from 'recompose';

EditableCell.propTypes = {
  editable: bool,
  value: string,
  handleChange: func.isRequired,
  onChange: func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  autoFocus: bool,
};

EditableCell.defaultProps = {
  editable: false,
  value: '',
  autoFocus: false,
};

function EditableCell({ handleChange, editable, value, autoFocus }) {
  return (
    <div>
      {editable ? (
        <div>
          <Input
            defaultValue={value}
            autoFocus={autoFocus}
            onBlur={({ target }) => handleChange(target.value)}
            onPressEnter={({ target }) => handleChange(target.value)}
          />
        </div>
      ) : (
        <div>{value.toString() || ' '}</div>
      )}
    </div>
  );
}

export default compose(
  withHandlers({
    handleChange: ({ onChange }) => (value) => {
      onChange(value);
    },
  }),
  pure,
)(EditableCell);
