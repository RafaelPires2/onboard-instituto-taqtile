import styles from "./styles.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../auth-validation/login-mutation";
import {
  emailRegex,
  passwordRegex,
} from "../../auth-validation/regex-email-password";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
    },
  });

  function handleChangeEmail(event: any) {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setEmailIsValid(emailRegex.test(newEmail));
  }

  function handleChangePassword(event: any) {
    const newPassword = event.target.value;
    setPassword(newPassword);

    setPasswordIsValid(passwordRegex.test(newPassword));
  }
  function clearInputs() {
    setEmail('');
    setPassword('');
    setErrorMessageEmail('');
    setErrorMessagePassword('');
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      try {
        await login({
          variables: {
            data: {
              email: email,
              password: password,
            },
          },
        });
        console.log("entrando....");
        clearInputs();
      } catch (error) {
        alert(error);
      }
    } else if (!emailIsValid) {
      setErrorMessageEmail('O email deve conter email@email.com');
    } else if (!passwordIsValid) {
      setErrorMessagePassword('A senha deve conter no mínimo 7 caracteres 1 letra e 1 número');
    } else {
      console.error(ErrorEvent);
    }
  }

  return (
    <>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input name='email' type='text' placeholder='Digite seu email' value={email} onChange={handleChangeEmail} required />
        <p>{errorMessageEmail}</p>

        <label htmlFor='password'>Senha</label>
        <input name='password' type='password' placeholder='Digite sua senha' value={password} onChange={handleChangePassword} required />
        <p>{errorMessagePassword}</p>
        <button type='submit'>Entrar</button>
      </form>
    </>
  );
}
