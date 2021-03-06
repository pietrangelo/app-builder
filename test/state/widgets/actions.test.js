import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';
import { gotoRoute, getParams } from '@entando/router';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import { mockApi } from 'test/testUtils';

import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_WIDGETS_TOTAL,
} from 'state/widgets/types';
import {
  getWidgetList,
  fetchWidgetList,
  setWidgetsTotal,
  fetchWidgetsTotal,
  fetchWidget,
  sendPostWidgets,
  sendPutWidgets,
  sendDeleteWidgets,
  loadSelectedWidget,
  setSelectedWidget,
  removeWidget,
} from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

import {
  getWidget,
  getWidgets,
  postWidgets,
  putWidgets,
  deleteWidgets,
} from 'api/widgets';
import { WIDGET, WIDGET_LIST } from 'test/mocks/widgets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_CODE = 'WDG';

getParams.mockImplementation(() => ({ widgetCode: 'WDG' }));

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidget: jest.fn(),
}));


describe('state/widgets/actions', () => {
  let store;
  let action;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  describe('getWidgetList', () => {
    beforeEach(() => {
      action = getWidgetList(WIDGET_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_WIDGET_LIST);
      expect(action).toHaveProperty('payload.widgetList', WIDGET_LIST);
    });
  });

  describe('setWidgetsTotal', () => {
    beforeEach(() => {
      action = setWidgetsTotal(12);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correctly setup', () => {
      expect(action).toHaveProperty('type', SET_WIDGETS_TOTAL);
      expect(action).toHaveProperty('payload.widgetsTotal', 12);
    });
  });

  describe('setSelectedWidget', () => {
    beforeEach(() => {
      action = setSelectedWidget(WIDGET);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_SELECTED_WIDGET);
      expect(action).toHaveProperty('payload.widget', WIDGET);
    });
  });

  describe('removeWidget', () => {
    beforeEach(() => {
      action = removeWidget('CODE');
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', REMOVE_WIDGET);
      expect(action).toHaveProperty('payload.widgetCode', 'CODE');
    });
  });


  describe('thunk', () => {
    describe('loadSelectedWidget', () => {
      it('if the widget is already selected, do nothing', (done) => {
        getSelectedWidget.mockReturnValue(WIDGET);
        store.dispatch(loadSelectedWidget(WIDGET.code)).then(() => {
          expect(getWidget).not.toHaveBeenCalled();
          expect(store.getActions()).toHaveLength(0);
          done();
        }).catch(done.fail);
      });

      it('if there is another widget selected, fetch and select the new widget', (done) => {
        store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
          expect(getWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_WIDGET);
          done();
        }).catch(done.fail);
      });

      it('if there is no widget selected, fetch and select the new widget', (done) => {
        getSelectedWidget.mockReturnValue(null);
        store.dispatch(loadSelectedWidget(WIDGET.code)).then(() => {
          expect(getWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_WIDGET);

          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getWidget.mockImplementation(mockApi({ errors: true }));
        store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
          expect(getWidget).toHaveBeenCalled();
          expect(store.getActions()).toHaveLength(1);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidget', () => {
      it('if API response is ok, initializes the form with widget information', (done) => {
        getWidget.mockImplementationOnce(mockApi({ payload: WIDGET }));
        store.dispatch(fetchWidget()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(initialize).toHaveBeenCalled();
          expect(actions[1]).toHaveProperty('type', SET_SELECTED_WIDGET);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[1].payload).toMatchObject({ widget: WIDGET });
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidget.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
          expect(store.getActions()).toHaveLength(1);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidgetsTotal', () => {
      it('checks that the widgets total is set', (done) => {
        store.dispatch(fetchWidgetsTotal()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_WIDGETS_TOTAL);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidgets.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchWidgetsTotal()).then(() => {
          expect(store.getActions()).toHaveLength(1);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidgetList', () => {
      it('calls setWidgetList and setPage action', (done) => {
        getWidgets.mockImplementation(mockApi({ payload: WIDGET_LIST }));
        store.dispatch(fetchWidgetList()).then(() => {
          expect(getWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_WIDGET_LIST);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          const actionPayload = actions[1].payload;
          expect(actionPayload).toHaveProperty('widgetList');
          expect(actionPayload.widgetList).toMatchObject(WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchWidgetList()).then(() => {
          expect(getWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostWidgets', () => {
      it('calls gotoRoute', (done) => {
        store.dispatch(sendPostWidgets({ code: 'test' })).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        postWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPostWidgets()).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutWidgets', () => {
      it('calls gotoRoute', (done) => {
        store.dispatch(sendPutWidgets(WIDGET)).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        putWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPutWidgets()).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
    describe('sendDeleteWidgets', () => {
      it('calls removeWidgets and gotoRoute', (done) => {
        store.dispatch(sendDeleteWidgets('WDG')).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', REMOVE_WIDGET);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        deleteWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteWidgets()).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });
  });
});
