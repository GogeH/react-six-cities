import { Route, Switch } from 'react-router-dom';

import Main from '../main/main';
import Loading from '../loading/loading';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import Error from '../error/error';
import PrivateRoute from '../private-route/private-route';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';
import { getIsDataLoaded } from '../../store/reducers/offers-data/selector-offers-data';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if(isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Main />
      </Route>
      <Route path={AppRoute.SignIn} exact component={SignIn} />
      <Route exact path={AppRoute.Room}>
        <Property />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Favorites}
        render={() => <Favorites />}
      />
      <Route component={Error} />
    </Switch>
  );
}

export default App;
