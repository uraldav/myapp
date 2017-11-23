import React from 'react';
import { compose, pure } from 'recompose';
import { object } from 'prop-types';
import { Header, Grid, Button, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import JobList from '../JobList/JobListConnected';

function MainPage() {
  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Header as="h1" size="large" textAlign="center" icon>
            <Icon name="space shuttle" rotated="counterclockwise" />
            <Header.Content>hidev.io</Header.Content>
            <Header.Subheader>techs, devs, projects, jobs</Header.Subheader>
          </Header>
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column width="5" />
          <Grid.Column width="6" textAlign="center">
            <Button size="large" primary fluid>
              Post a job
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>123</Grid.Row>
      </Grid>
    </Layout>
  );
}

export default compose(pure)(MainPage);
