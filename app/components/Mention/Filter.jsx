import React from 'react';
import { compose, pure } from 'recompose';
import {
  Collapse,
  Slider,
  Select,
  Radio,
  InputNumber,
  DatePicker,
} from 'antd';
import './Filter.less';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Panel = Collapse.Panel;

MentionFilter.propTypes = {

};

function MentionFilter() {
  return (
    <Collapse bordered={false} styleName="filter">
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
      <Panel header="Тональность">
        <Radio.Group>
          <Radio.Button value="positive">Позитивный</Radio.Button>
          <Radio.Button value="negative">Негативный</Radio.Button>
          <Radio.Button value="neutral">Нейтральный</Radio.Button>
        </Radio.Group>
      </Panel>
      <Panel header="Число подписчиков">
        <InputNumber min={1} />
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
        <Radio.Group value="today">
          <Radio value="today">сегодня</Radio>
          <Radio value="all">все</Radio>
          <Radio value="period">за указанный период</Radio>
          <RangePicker />
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default compose(
  pure,
)(MentionFilter);
