import { Route, Switch, Redirect } from "react-router-dom";
import {
  User,
  Users,
  Dashboard,
} from "../../../movies-app/src/components/pages";

const AdminSwitch = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/users`} children={<Users />} />
      <Route exact path={`${match.path}/users/:id`} children={<User />} />
      <Route exact path={`${match.path}/dashboard`} children={<Dashboard />} />
      <Redirect to={`${match.path}/dashboard`} />
    </Switch>
  );
};

export default AdminSwitch;
