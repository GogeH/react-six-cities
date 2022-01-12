import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={
        () => (
          authorizationStatus === AuthorizationStatus.Auth
            ? props.render()
            : <Redirect to={AppRoute.SignIn} />
        )
      }
    />
  );
}

export default PrivateRoute;
