import { connect } from "react-redux";
import { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { dashboardActions, usersActions } from "../redux/actionCreators";

const Main = ({ fetchMenu, refreshToken }) => {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const back = (e) => {
    e.stopPropagation();
    history.push(background);
  };
  const handleRegistr = (data) => {
    console.log("register", data);
    register(data).then(() => back());
  };
  const handleAuth = (data) => {
    console.log("auth", data);
    login(data).then(() => back());
  };
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);
  useEffect(() => {
    fetchDashboardInfo();
    let fetchInterval = setInterval(fetchDashboardInfo, 1000 * 60 * 3);
    return () => {
      clearInterval(fetchInterval);
    };
  }, [fetchDashboardInfo]);
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Switch location={background || location}>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" children={<Home />} />
          <Route path="/films" children={<Films />} />
          <PrivateRoute path="/user" component={UserInfo} />
          <PrivateRoute path="/profiles" component={Profiles} />
          <PrivateRoute
            path="/admin"
            roles={[ROLES.ADMIN]}
            component={AdminSwitch}
          />
          <Redirect
            from="/login"
            to={{
              pathname: "/login",
              state: { background: { pathname: "/home" } },
            }}
          />
          <Redirect
            from="/register"
            to={{
              pathname: "/register",
              state: { background: { pathname: "/home" } },
            }}
          />
          <Redirect to="/home" />
        </Switch>
        {background && (
          <>
            <Route
              path="/login"
              children={
                <AuthFormModal
                  submitComponent={Loading}
                  handleSubmit={handleAuth}
                  handleClose={back}
                />
              }
            />
            <Route
              path="/registr"
              children={
                <RegistrFormModal
                  submitComponent={Loading}
                  handleSubmit={handleRegistr}
                  handleClose={back}
                />
              }
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order, list, isLoading, message } = state.films;
  const films = sorting ? sorting(list, order) : list;
  return { films, order, sorting, isLoading, message };
};

const mapDispatch = {
  fetchDashboardInfo: dashboardActions.fetchDashboardInfo,
  refreshToken: usersActions.refreshToken,
};

export default connect(mapState, mapDispatch)(Main);
