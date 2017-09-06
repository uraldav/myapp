import React from 'react';
import { Table, Button, Modal, Popconfirm } from 'antd';
import { string, arrayOf, shape } from 'prop-types';
import EditableCell from './EditableCell';
import './EditableTable.less';

// EditableTable.propTypes = {
//   data: arrayOf(
//     shape({
//       key: string,
//       name: string,
//       login: string,
//       position: string,
//       mail: string,
//       role: string,
//     }),
//   ).isRequired,
// };

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'ФИО',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'name', text),
      },
      {
        title: 'Логин',
        width: '12%',
        dataIndex: 'login',
        sorter: (a, b) => a.login.localeCompare(b.login),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'login', text),
      },
      {
        title: 'Должность',
        width: '17%',
        dataIndex: 'position',
        sorter: (a, b) => a.position.localeCompare(b.position),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'position', text),
      },
      {
        title: 'E-mail',
        width: '17%',
        dataIndex: 'mail',
        sorter: (a, b) => a.mail.localeCompare(b.mail),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'mail', text),
      },
      {
        title: 'Роль',
        width: '12%',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'role', text),
      },
      {
        title: '',
        key: 'operation',
        width: '116px',
        fixed: 'right',

        render: (text, record, index) => {
          const { editable } = this.state.data[index].name;
          return (
            <span styleName="action-button-wrapper">
              {editable ? (
                <span>
                  <Button
                    shape="circle"
                    icon="save"
                    onClick={() => this.editDone(index, 'save')}
                  />
                  <Popconfirm
                    title="Отменить изменения?"
                    onConfirm={() => this.editDone(index, 'cancel')}
                  >
                    <Button shape="circle" icon="close" />
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <Button
                    shape="circle"
                    icon="edit"
                    onClick={() => this.edit(index)}
                  />
                </span>
              )}
              <span className="ant-divider" />
              <Button
                shape="circle"
                icon="delete"
                onClick={() =>
                  Modal.confirm({
                    title: 'Удалить пользователя?',
                    content: `Вы уверены, что хотите удалить пользователя  ${record.name}?`,
                    iconType: 'exclamation-circle',
                  })}
              />
            </span>
          );
        },
      },
    ];
    this.state = {
      data: this.props.data,
    };
  }

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== 'undefined'
      ) {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }

  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== 'undefined'
      ) {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (
          data[index][item] &&
          typeof data[index][item].editable !== 'undefined'
        ) {
          delete data[index][item].status;
        }
      });
    });
  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />
    );
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        styleName="table"
      />
    );
  }
}

export default EditableTable;
