import { getPageModels, getPageModel, deletePageModel } from 'api/pageModels';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL } from 'state/page-models/types';
import { getSelectedPageModel } from 'state/page-models/selectors';


export const setPageModels = pageModels => ({
  type: SET_PAGE_MODELS,
  payload: {
    pageModels,
  },
});

export const setSelectedPageModel = pageModel => ({
  type: SET_SELECTED_PAGE_MODEL,
  payload: {
    pageModel,
  },
});

export const removePageModelSync = pageModelCode => ({
  type: REMOVE_PAGE_MODEL,
  payload: {
    pageModelCode,
  },
});


export const fetchPageModels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('pageModels'));
    getPageModels(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageModels(data.payload));
          dispatch(toggleLoading('pageModels'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('pageModels'));
          resolve();
        }
      });
    });
  })
);

export const removePageModel = pageModelCode => dispatch => (
  new Promise((resolve) => {
    deletePageModel(pageModelCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removePageModelSync(pageModelCode));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  })
);

export const loadSelectedPageModel = pageCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageModel(getState());
  if (selectedPage && selectedPage.code === pageCode) {
    return new Promise(r => r(selectedPage));
  }
  return getPageModel(pageCode)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          const pageObject = json.payload;
          dispatch(setSelectedPageModel(pageObject));
          return pageObject;
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        return null;
      }));
};
