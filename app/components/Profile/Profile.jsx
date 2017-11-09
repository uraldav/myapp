import React from 'react';
import { compose, pure } from 'recompose';
import { Grid, Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function Profile() {
  return (
    <Grid>
      <Grid.Column width="16">
        <Grid.Row>
          <Header as="h1" textAlign="center">
            <Header.Content>Company name</Header.Content>
            <Header.Subheader>Manage your job listing</Header.Subheader>
          </Header>
          <Menu tabular size="large">
            <NavLink className="item active" to="/profile">
              Active
            </NavLink>
            <NavLink className="item" to="/profile/archive">
              Archive
            </NavLink>
          </Menu>
        </Grid.Row>
        <Grid.Row />
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(Profile);
