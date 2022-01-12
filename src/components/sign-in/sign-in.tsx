import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../store/api-action';
import { FormEvent, useRef, useState } from 'react';
import Logo from '../logo/logo';

const EMAIL_VALID = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
const PASSWORD_VALID = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

const isEmailValid = (email: string): boolean => EMAIL_VALID.test(email.toLowerCase());
const isPasswordValid = (password: string): boolean => PASSWORD_VALID.test(password.toLowerCase());

function SignIn(): JSX.Element {
  const dispatch = useDispatch();

  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current;
      const password = passwordRef.current;

      setEmailError(!isEmailValid(email.value));
      setPasswordError(!isPasswordValid(password.value));

      if (isEmailValid(email.value) && isPasswordValid(password.value)) {
        dispatch(loginAction({
          login: emailRef.current.value,
          password: passwordRef.current.value,
        }));
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

            <Logo />

          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__message">
                {isEmailError && !isPasswordError && <p>Введена некорректная электронная почта.<br/>Пожайлуста введите электронную почту снова!</p>}
                {!isEmailError && isPasswordError && <p>Введен некорректный пароль.<br/>Пожайлуста введите пароль снова!</p>}
                {isEmailError && isPasswordError && <p>Электронная почта и пароль некорректны.<br/>Введите данные заново!</p>}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="user-email">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="text"
                  placeholder="Email"
                  name="user-email"
                  id="user-email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="user-password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
