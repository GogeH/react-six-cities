import { Link } from 'react-router-dom';
import { MouseEvent} from 'react';

import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/api-action';
import { getAuthInfo, getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

function Nav(): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const authInfo = useSelector(getAuthInfo);

  const handlerButtonClickLogout = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth &&
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img src={authInfo.avatarUrl} alt={authInfo.name} width="63" height="63" />
              </div>
              <span className="header__user-name user__name">{authInfo.email}</span>
            </Link>
          </li>}

        <li className="header__nav-item">
          <div className="header__nav-link">
            <span className="header__signout">

              {
                authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <Link to="/" onClick={handlerButtonClickLogout}>Sign out</Link>
                  :
                  <Link to={AppRoute.SignIn}>Sign in</Link>
              }

            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
