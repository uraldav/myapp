import React from 'react';
import { Input } from 'antd';
import { string, bool, func, node } from 'prop-types';
import { compose, withHandlers, pure } from 'recompose';

EditableCell.propTypes = {
  editable: bool,
  value: string,
  handleChange: func.isRequired,
  onChange: func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  autoFocus: bool,
  children: node,
};

EditableCell.defaultProps = {
  editable: false,
  value: '',
  autoFocus: false,
  children: null,
};

function EditableCell({ handleChange, editable, value, autoFocus, children }) {
  return (
    <div>
      {editable ? (
        <div>
          <Input
            defaultValue={value}
            autoFocus={autoFocus}
            onBlur={({ target }) => handleChange(target.value)}
            onPressEnter={({ target }) => handleChange(target.value)}
            addonAfter={children}
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
