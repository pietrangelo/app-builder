import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { required, userFormText, email } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

export const renderStaticField = (field) => {
  const { input, label, name } = field;
  const fieldValue = (input.value.title) ? input.value.title : input.value;
  if (!input.value) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        {fieldValue}
      </Col>
    </div>
  );
};

export class UserEditProfileFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      onSubmit, handleSubmit, invalid, submitting, mode,
    } = this.props;

    const showUsername = (
      <Field
        component={RenderTextInput}
        name="username"
        label={<FormLabel labelId="user.table.username" helpId="user.username.help" />}
        placeholder={formattedText('user.table.username')}
        disabled={mode === EDIT_MODE}
      />
    );
    const fullName = (
      <Field
        component={RenderTextInput}
        name="fullname"
        label={<FormLabel labelId="user.table.fullName" helpId="user.profile.help" required />}
        placeholder={formattedText('user.table.fullName')}
        validate={mode !== EDIT_MODE ? [required, userFormText] : undefined}
      />
    );
    const eMail = (
      <Field
        component={RenderTextInput}
        name="email"
        label={<FormLabel labelId="user.table.email" helpId="user.profile.help" required />}
        placeholder={formattedText('user.table.email')}
        validate={mode !== EDIT_MODE ? [required, email, userFormText] : undefined}
      />
    );


    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="UserEditProfileForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              {/* <PROFILE TYPES SECTION> */}
              <hr />
              {showUsername}
              {fullName}
              {eMail}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

UserEditProfileFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  // profileTypes: PropTypes.arrayOf(PropTypes.shape({
  //   value: PropTypes.string,
  //   text: PropTypes.string,
  // })),
};

UserEditProfileFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  onWillMount: null,
  // profileTypes: [],
};

const UserEditProfileForm = reduxForm({
  form: 'user',
})(UserEditProfileFormBody);

export default UserEditProfileForm;
