import React from 'react';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Card } from 'semantic-ui-react';
import JobCard from '../JobCard/JobCard';

Main.propTypes = {};

Main.defaultProps = {};

function Main() {
  return (
    <Container>
      <Header size="large" textAlign="center">
        <Header.Content as="h1">hidev.io</Header.Content>
        <Header.Subheader>techs, devs, projects, jobs</Header.Subheader>
      </Header>
      <Grid textAlign="left">
        <Grid.Column>
          <JobCard
            title="Middle Scala Developer"
            company="Amazon Corp."
            location="Innopolis, Tatarstan"
          />
          <JobCard
            title="Senior PHP developer"
            company="Awesome Dev Inc"
            location="Innopolis, Tatarstan"
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default compose(pure)(Main);
