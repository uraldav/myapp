import React from 'react';
import { compose, pure } from 'recompose';
import { Grid, Header, Menu, Table, Icon } from 'semantic-ui-react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import JobForm from '../JobForm/JobForm';

function Profile({ match }) {
  return (
    <Grid>
      <Grid.Column width="16">
        <Grid.Row>
          <Header as="h1" textAlign="center">
            <Header.Content>Company name</Header.Content>
            <Header.Subheader>Manage your job listing</Header.Subheader>
          </Header>
          <Menu pointing secondary size="large">
            <NavLink exact className="item" to={`${match.url}`}>
              Active
            </NavLink>
            <NavLink exact className="item" to={`${match.url}/archive`}>
              Archive
            </NavLink>
            <Menu.Menu position="right">
              <NavLink className="item" to="/addjob">
                <Icon name="add" />
                Add job
              </NavLink>
            </Menu.Menu>
          </Menu>
          <Switch>
            <Route exact path={`${match.url}`}>
              <Table basic="very" striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`${match.url}/edit`}>PHP developer</Link>
                    </Table.Cell>
                    <Table.Cell>5 day ago</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`${match.url}/edit`}>
                        Senior Frontend developer
                      </Link>
                    </Table.Cell>
                    <Table.Cell>A week ago</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`${match.url}/edit`}>Software Engineer</Link>
                    </Table.Cell>
                    <Table.Cell>Today</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Route>
            <Route exact path={`${match.url}/archive`}>
              <Header as="h3" textAlign="center">
                Archive jobs
              </Header>
            </Route>
          </Switch>
        </Grid.Row>
        <Grid.Row />
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(Profile);
