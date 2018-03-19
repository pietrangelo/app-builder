
import { combineReducers } from 'redux';
import { SET_SELECTED, SET_FRAGMENTS, SET_WIDGET_TYPES, SET_PLUGINS } from 'state/fragments/types';

const toMap = array => array.reduce((acc, fragment) => {
  acc[fragment.code] = fragment;
  return acc;
}, {});

const toIdList = array => array.map(fragment => fragment.code);

const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED: {
      return action.payload.fragment;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FRAGMENTS: {
      return toIdList(action.payload.fragments);
    }
    default: return state;
  }
};

const fragmentMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_FRAGMENTS: {
      return toMap(action.payload.fragments);
    }
    default: return state;
  }
};

const widgetTypes = (state = [], action = {}) => {
  switch (action.type) {
    case SET_WIDGET_TYPES: {
      return action.payload.widgetTypes;
    }
    default: return state;
  }
};

const plugins = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PLUGINS: {
      return action.payload.plugins;
    }
    default: return state;
  }
};


export default combineReducers({
  selected,
  list,
  map: fragmentMap,
  widgetTypes,
  plugins,
});
