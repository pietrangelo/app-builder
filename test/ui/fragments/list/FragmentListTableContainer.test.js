import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentListTableContainer';
import { LIST_FRAGMENTS_OK_PAGE_1, FRAGMENTS_OK_NORMALIZED } from 'test/mocks/fragments';

const dispatchMock = jest.fn();

describe('FragmentListTableContainer', () => {
  it('maps fragmentList property state in FragmentListTable', () => {
    expect(mapStateToProps(FRAGMENTS_OK_NORMALIZED)).toEqual({
      fragments: LIST_FRAGMENTS_OK_PAGE_1.payload,
      page: LIST_FRAGMENTS_OK_PAGE_1.metaData.page,
      totalItems: LIST_FRAGMENTS_OK_PAGE_1.metaData.lastPage *
        LIST_FRAGMENTS_OK_PAGE_1.metaData.pageSize,
      pageSize: LIST_FRAGMENTS_OK_PAGE_1.metaData.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
