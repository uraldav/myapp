import React from 'react';
import { compose, pure } from 'recompose';
import { Grid, Header } from 'semantic-ui-react';

function JobView() {
  return (
    <Grid>
      <Grid.Column width="16">
        <Grid.Row>
          <Header as="h1" textAlign="left">
            <Header.Content>Company name</Header.Content>
            <Header.Subheader>AwesomeDev.inc</Header.Subheader>
            <Header.Subheader>Innopolis, Tatarstan</Header.Subheader>
          </Header>
        </Grid.Row>
        <Grid.Row />
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(JobView);
