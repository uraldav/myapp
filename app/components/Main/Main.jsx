import React from 'react';
import { arrayOf, node } from 'prop-types';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Grid,
  Card,
  Button,
  Icon,
  Divider,
} from 'semantic-ui-react';
import JobCard from '../JobCard/JobCard';
import JobList from '../../containers/JobList/JobListConnected';

Main.propTypes = {
  children: arrayOf(node),
};

Main.defaultProps = {
  children: [],
};

function Main({ children }) {
  return (
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
      {children.map(child => <Grid.Row>{child}</Grid.Row>)}
    </Grid>
  );
}

export default compose(pure)(Main);
