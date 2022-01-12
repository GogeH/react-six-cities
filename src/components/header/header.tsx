import { memo } from 'react';

import Logo from '../logo/logo';
import Nav from '../nav/nav';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">

          <Logo />

          <Nav />

        </div>
      </div>
    </header>
  );
}

export default memo(Header);
