import styles from './styles.module.css';
import React, { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  function handleChangeEmail(event: any) {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    setEmailIsValid(emailRegex.test(newEmail));
  }

  function handleChangePassword(event: any) {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|;':",.<>/?]{7,}$/;
    setPasswordIsValid(passwordRegex.test(newPassword));
  }
  function clearInputs() {
    setEmail('');
    setPassword('');
    setErrorMessageEmail('');
    setErrorMessagePassword('');
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      console.log('entrando...');
      clearInputs();
    } else if (!emailIsValid) {
      setErrorMessageEmail('O email deve conter email@email.com');
    } else if (!passwordIsValid) {
      setErrorMessagePassword('A senha deve conter no mínimo 7 caracteres 1 letra e 1 número');
    } else {
      console.error(ErrorEvent);
    }
  }

  console.log(email);
  console.log(password);
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
