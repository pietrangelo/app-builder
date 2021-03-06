import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const AttributeOgnlValidation = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.ognl.validation" />
        </legend>
        <p><FormattedMessage id="app.ognl.validation.help1" /></p>
        <p><FormattedMessage id="app.ognl.validation.help2" /></p>
        <p><FormattedMessage id="app.ognl.validation.help3" /></p>
        <p><FormattedMessage id="app.ognl.validation.help4" /></p>
        <Field
          component={RenderTextInput}
          name="ognlValidation.ognlExpression"
          label={
            <FormLabel labelId="app.ognl.expression" />
          }
        />
        <FormGroup>
          <label htmlFor="mandatory" className="col-xs-2 control-label">
            <FormLabel labelId="app.apply.expression" />
          </label>
          <Col xs={4}>
            <Field component={SwitchRenderer} name="ognlValidation.applyOnlyToFilledAttr" />
          </Col>
        </FormGroup>

        <p>
          <FormattedMessage id="app.ognl.validation.add.message.help" />
        </p>

        <Field
          component={RenderTextInput}
          name="ognlValidation.helpMessage"
          label={
            <FormLabel labelId="app.help.message" />
          }
        />
        <Field
          component={RenderTextInput}
          name="ognlValidation.keyForHelpMessage"
          label={
            <FormLabel labelId="app.help.message.key" />
          }
        />
        <Field
          component={RenderTextInput}
          name="ognlValidation.errorMessage"
          label={
            <FormLabel labelId="app.error.message" />
          }
        />
        <Field
          component={RenderTextInput}
          name="ognlValidation.keyForErrorMessage"
          label={
            <FormLabel labelId="app.error.message.key" />
                }
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributeOgnlValidation;
