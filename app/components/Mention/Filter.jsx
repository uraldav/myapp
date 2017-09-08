import React from 'react';
import { func } from 'prop-types';
import { compose, pure } from 'recompose';
import {
  Collapse,
  Slider,
  Select,
  Radio,
  Input,
  DatePicker,
  Form,
  Button,
  Checkbox,
} from 'antd';
import './Filter.less';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Panel = Collapse.Panel;
const InputGroup = Input.Group;

MentionFilter.propTypes = {
  onApplyFilter: func.isRequired,
};

function MentionFilter({
  onApplyFilter,
}) {
  return (
    <Form styleName="filter">
      <Collapse bordered={false} styleName="collapse">
        <Panel header="Приоритет">
          <Slider range defaultValue={[20, 50]} />
        </Panel>
        <Panel header="Статус обработки">
          <Select placeholder="Выбрать статус">
            <Option value="1">Обработан</Option>
            <Option value="2">Не обработан</Option>
          </Select>
        </Panel>
        <Panel header="Тематики">
          <Select
            mode="multiple"
            placeholder="Выбрать тематику"
          >
            <Option value="1">Тематика 1</Option>
            <Option value="2">Тематика 2</Option>
            <Option value="3">Тематика 3</Option>
            <Option value="4">Тематика 4</Option>
          </Select>
        </Panel>
        <Panel header="Тональность" styleName="tones">
          <Checkbox>Позитивный</Checkbox>
          <Checkbox>Негативный</Checkbox>
          <Checkbox>Нейтральный</Checkbox>
        </Panel>
        <Panel header="Число подписчиков">
          <InputGroup compact styleName="followers-input-group">
            <Input placeholder="минимум" />
            <Input placeholder="-" disabled />
            <Input placeholder="максимум" />
          </InputGroup>
        </Panel>
        <Panel header="Пользователи">
          <Select
            mode="multiple"
            placeholder="Выбрать пользователя"
          >
            <Option value="1">Иванов Иван</Option>
            <Option value="2">Тони Зима</Option>
            <Option value="3">Флойд Майвейзер</Option>
            <Option value="4">Mcgregor</Option>
          </Select>
        </Panel>
        <Panel header="Период дат">
          <Radio.Group value="today" styleName="period-date-group">
            <Radio value="today">сегодня</Radio>
            <Radio value="all">все</Radio>
            <Radio value="period">за указанный период</Radio>
            <RangePicker />
          </Radio.Group>
        </Panel>
      </Collapse>
      <div styleName="action-bar">
        <Button type="primary" onClick={onApplyFilter}>Применить</Button>
      </div>
    </Form>
  );
}

export default compose(
  pure,
)(MentionFilter);
