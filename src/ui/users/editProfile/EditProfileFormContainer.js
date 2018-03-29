import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';

import { fetchUserForm, sendPutUser } from 'state/users/actions';
import UserEditProfileForm from 'ui/users/common/UserEditProfileForm';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => ({
  mode: EDIT_MODE,
  username: getParams(state).username,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (user) => { dispatch(sendPutUser(user)); },
});


const EditProfileFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserEditProfileForm);
export default EditProfileFormContainer;
