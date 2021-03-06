import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/edit/EditWidgetFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getSelectedWidgetDefaultUi } from 'state/widgets/selectors';

const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  mode: 'edit',
  groups: [GROUP],


};

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

getGroupsList.mockReturnValue([GROUP]);

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidgetDefaultUi: jest.fn(),
}));

getSelectedWidgetDefaultUi.mockReturnValue('');

describe('EditWidgetFormContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE);
    });

    it('maps groups and mode property state in WidgetForm', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('groups', [GROUP]);
      expect(props).toHaveProperty('defaultUIField');
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(TEST_STATE);
    });

    it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
      const result = mapDispatchToProps(dispatchMock);
      expect(result.onWillMount).toBeDefined();
      result.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
