import {
  WIDGET_TYPES_OK, PLUGINS_OK, LIST_FRAGMENTS_OK_PAGE_1, WIDGET_TYPES_OPTIONS,
  PLUGINS_OPTIONS, FRAGMENTS_OK_NORMALIZED,
} from 'test/mocks/fragments';

import {
  getFragments, getWidgetTypes, getPlugins, getFragmentSelected,
  getWidgetTypesOptions, getPluginsOptions, getFragmentList,
  getFragmentsIdList, getFragmentsMap,
} from 'state/fragments/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const list = [
  {
    code: 'myCode',
  },
];

const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;
const FRAGMENT_PAYLOAD = LIST_FRAGMENTS_OK_PAGE_1.payload;


const MOCK_STATE = {
  fragments: {
    list,
    selected: FRAGMENT_PAYLOAD,
    widgetTypes: WIDGET_TYPES_PAYLOAD,
    plugins: PLUGINS_PAYLOAD,
  },
};

describe('state/fragments/selectors', () => {
  it('getFragments(state) returns the fragments object', () => {
    const selected = getFragments(FRAGMENTS_OK_NORMALIZED);
    expect(selected).toBe(FRAGMENTS_OK_NORMALIZED.fragments);
  });

  it('verify getFragmentsIdList selector', () => {
    expect(getFragmentsIdList(FRAGMENTS_OK_NORMALIZED))
      .toEqual(FRAGMENTS_OK_NORMALIZED.fragments.list);
  });

  it('verify getFragmentsMap selector', () => {
    expect(getFragmentsMap(FRAGMENTS_OK_NORMALIZED))
      .toEqual(FRAGMENTS_OK_NORMALIZED.fragments.map);
  });

  it('verify getFragmentList selector', () => {
    expect(getFragmentList(FRAGMENTS_OK_NORMALIZED))
      .toEqual(FRAGMENT_PAYLOAD);
  });

  it('getWidgetTypes(state) returns the widgetTypes list', () => {
    const selected = getWidgetTypes(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.widgetTypes);
  });

  it('getPlugins(state) returns the plugins list', () => {
    const selected = getPlugins(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.plugins);
  });

  it('getFragmentSelected(state) returns the selected object', () => {
    const selected = getFragmentSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.selected);
  });

  it('getWidgetTypesOptions(state) returns a calculated widgetTypesOption list', () => {
    const selected = getWidgetTypesOptions(MOCK_STATE);
    expect(selected).toEqual(WIDGET_TYPES_OPTIONS);
    expect(selected[0].optgroup).toBeDefined();
    expect(selected[0].options).toBeDefined();
  });

  it('getPluginsOptions(state) returns a calculated pluginsOption list', () => {
    const selected = getPluginsOptions(MOCK_STATE);
    expect(selected).toEqual(PLUGINS_OPTIONS);
  });
});
