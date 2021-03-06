import { gotoRoute, getParams } from '@entando/router';
import { addErrors } from '@entando/messages';

import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { initialize } from 'redux-form';

import {
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
} from 'app-init/router';

import {
  postDataType,
  putDataType,
  deleteDataType,
  getDataType,
  getDataTypes,
  getDataTypesStatus,
  postDataTypesStatus,
  deleteAttributeFromDataType,
  getAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  getDataTypeAttributes,
  getDataTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
} from 'api/dataTypes';
import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  SET_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_DATA_TYPE_REFERENCE_STATUS,
} from 'state/data-types/types';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeType,
  getSelectedDataType,
  getSelectedAttributeType,
} from 'state/data-types/selectors';

const TYPE_MONOLIST = 'Monolist';

// Data type
export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

export const removeDataType = dataTypeCode => ({
  type: REMOVE_DATA_TYPE,
  payload: {
    dataTypeCode,
  },
});

export const setSelectedDataType = dataType => ({
  type: SET_SELECTED_DATA_TYPE,
  payload: {
    dataType,
  },
});

export const setDataTypeReferenceStatus = dataTypeStatus => ({
  type: SET_DATA_TYPE_REFERENCE_STATUS,
  payload: {
    dataTypeStatus,
  },
});

export const setSelectedAttributeDataType = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (dataTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    dataTypeCode,
    attributeCode,
  },
});

// Data type attributes
export const setSelectedAttribute = attribute => ({
  type: SET_SELECTED_ATTRIBUTE,
  payload: {
    attribute,
  },
});

export const setDataTypeAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes,
  },
});

export const moveAttributeUpSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_UP,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});

export const moveAttributeDownSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_DOWN,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});

// thunk

export const fetchDataTypeReferenceStatus = () => dispatch => new Promise((resolve) => {
  getDataTypesStatus().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setDataTypeReferenceStatus(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostDataTypeReferenceStatus = dataTypesCodes => dispatch =>
  (new Promise((resolve) => {
    postDataTypesStatus({ dataTypesCodes }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  }));


export const sendPostDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    postDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: json.payload.code });
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendPutDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    putDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendDeleteDataType = dataTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteDataType(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeDataType(dataTypeCode));
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const fetchDataType = dataTypeCode => dispatch => (
  new Promise((resolve) => {
    getDataType(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedDataType(json.payload));
          dispatch(initialize('DataType', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDataTypes(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDataTypeAttribute = (dataTypeAttributeCode, route) => dispatch => (
  new Promise((resolve) => {
    getDataTypeAttribute(dataTypeAttributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttribute(json.payload));
          if (route) {
            gotoRoute(route.route, route.params);
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchAttributeFromDataType = (dataTypeCode, attributeCode) => (dispatch, getState) => (
  new Promise((resolve) => {
    getAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const joinRoles = json.payload.roles ? json.payload.roles.map(role => (role.code)) : [];
          dispatch(initialize('attribute', {
            ...json.payload,
            joinRoles,
            joinAllowedOptions: joinRoles,
          }));
          dispatch(setSelectedAttributeDataType(json.payload));
          dispatch(fetchDataTypeAttribute(getSelectedAttributeType(getState())));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);


export const sendPostAttributeFromDataType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    const list = getDataTypeSelectedAttributeType(getState());
    postAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: dataTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromDataType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    putAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: dataTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromDataTypeMonolist = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    putAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendDeleteAttributeFromDataType = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getSelectedDataType(getState()).code;
    deleteAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(dataTypeCode, attributeCode));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);


export const fetchDataTypeAttributes = (page = { page: 1, pageSize: 0 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypeAttributes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const list = getDataTypeAttributesIdList(getState());
          if (!list || list.length === 0) {
            dispatch(setDataTypeAttributes(json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendMoveAttributeUp = ({ entityCode, attributeCode, attributeIndex }) => dispatch => (
  new Promise((resolve) => {
    moveAttributeUp(entityCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(moveAttributeUpSync({
            ...json.payload,
            entityCode,
            attributeIndex,
          }));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendMoveAttributeDown = ({ entityCode, attributeCode, attributeIndex }) =>
  dispatch => (
    new Promise((resolve) => {
      moveAttributeDown(entityCode, attributeCode).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(moveAttributeDownSync({
              ...json.payload,
              entityCode,
              attributeIndex,
            }));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      }).catch(() => {});
    })
  );
