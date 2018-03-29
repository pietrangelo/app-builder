import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditProfileFormContainer from 'ui/users/editProfile/EditProfileFormContainer';

const EditProfileUserPage = () => (
  <InternalPage className="EditUserPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userSettings" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.profile.title" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.editProfile"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          <EditProfileFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditProfileUserPage;
