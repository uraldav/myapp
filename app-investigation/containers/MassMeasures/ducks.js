import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('MassMeasures');

export const CHANGE_EDITABLE_MEASURE = ducks.defineType(
  'CHANGE_EDITABLE_MEASURE',
);
export const SELECT_EDITABLE_MEASURE = ducks.defineType(
  'SELECT_EDITABLE_MEASURE',
);

export const changeEditableMeasure = ducks.createAction(
  CHANGE_EDITABLE_MEASURE,
);
export const selectEditableMeasure = ducks.createAction(
  SELECT_EDITABLE_MEASURE,
);

const mock = [
  {
    id: '123',
    segment_name: 'Мандарины убрать',
    segment_description: 'Негативные отзывы по питанию (мандарины)',
    spp: 'ДУКП ОСС',
    status: 'Выполнено',
    date: '27.12.2017',
    date_measures: '28.12.2017',
  },
  {
    id: '456',
    segment_name: 'Перекрасить стюардесс',
    segment_description: 'Негативные отзывы по стюардессам',
    spp: 'ДУКП ОСС',
    status: 'Выполнено',
    date: '27.12.2017',
    date_measures: '28.12.2017',
  },
];

const initialState = fromJS({
  editableMeasure: null,
  data: mock,
});

export default ducks.createReducer(
  {
    [SELECT_EDITABLE_MEASURE]: (state, { payload }) =>
      state.set(
        'editableMeasure',
        state
          .get('data')
          .find(measure => measure.get('id') === payload.id)
          .toJS(),
      ),
    [CHANGE_EDITABLE_MEASURE]: (state, { payload }) =>
      state.set('editableMeasure', payload),
  },
  initialState,
);
