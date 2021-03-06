import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';

import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import { sendPostWidgets } from 'state/widgets/actions';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchGroups({ page: 1, pageSize: 0 })); },
  onSubmit: (values) => {
    dispatch(clearErrors());
    dispatch(sendPostWidgets(values));
  },

});

const WidgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);
export default WidgetFormContainer;
