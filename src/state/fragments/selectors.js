import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';

export const getFragments = state => state.fragments;
export const getFragmentsIdList = state => state.fragments.list;
export const getFragmentsMap = state => state.fragments.map;
export const getWidgetTypes = state => state.fragments.widgetTypes;
export const getPlugins = state => state.fragments.plugins;

export const getFragmentList = createSelector(
  [getFragmentsIdList, getFragmentsMap],
  (idList, fragmentMap) => idList.map(id => (fragmentMap[id])),
);

export const getFragmentSelected = createSelector(
  [getFragments],
  fragment => fragment.selected,
);

export const getWidgetTypesOptions = createSelector(
  [getWidgetTypes, getLocale],
  (widgetTypes, locale) =>
    widgetTypes.map(item => ({
      optgroup: item.widgetType[locale],
      options: item.widgetList.map(widget => ({
        code: widget.code,
        title: widget.titles[locale],
      })),
    })),
);

export const getPluginsOptions = createSelector(
  [getPlugins, getLocale],
  (plugins, locale) =>
    plugins.map(plugin => ({
      code: plugin.code,
      title: plugin.titles[locale],
    })),
);
