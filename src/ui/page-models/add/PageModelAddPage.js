import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_PAGE_MODEL_LIST } from 'app-init/router';
import PageModelFormContainer from 'ui/page-models/common/PageModelFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';


const PageModelAddPage = () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <InternalPage className="PageModelAddPage">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem active>
                <FormattedMessage id="menu.pageDesigner" />
              </BreadcrumbItem>
              <BreadcrumbItem route={ROUTE_PAGE_MODEL_LIST}>
                <FormattedMessage id="menu.pageModels" />
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <FormattedMessage id="app.add" />
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PageTitle titleId="app.add" helpId="pageModels.help" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ErrorsAlertContainer />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PageModelFormContainer mode="add" />
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  </DragDropContextProvider>
);

export default PageModelAddPage;
