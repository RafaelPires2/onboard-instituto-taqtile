import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../auth-validation/gql-queries';
import { emailRegex, passwordRegex } from '../../auth-validation/regex-validators';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CustomInput } from '../input';
import { CustomButton } from '../button';
import { FormLogin } from './styles';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [loading, setLoading] = useState('Entrar');
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      clearInputs();
      navigate('/dashboard');
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
      setLoading('Carregando...');
      try {
        await login({
          variables: {
            data: {
              email: email,
              password: password,
            },
          },
        });
      } catch {
        {
          error?.message;
        }
        setLoading('Entrar');
        alert('Email ou senha inválidos, verifique e tente novamente');
      }
    } else if (!emailIsValid) {
      setErrorMessageEmail('O email deve conter email@email.com');
    } else if (!passwordIsValid) {
      setErrorMessagePassword('A senha deve conter no mínimo 7 caracteres 1 letra e 1 número');
    }
  }

  return (
    <FormLogin onSubmit={handleSubmit}>
      <CustomInput
        label='Email'
        name='email'
        type='text'
        placeholder='Digite seu email'
        value={email}
        onChange={handleChangeEmail}
        errorMessage={errorMessageEmail}
        required
      />

      <CustomInput
        label='Password'
        name='password'
        type='password'
        placeholder='Digite sua senha'
        value={password}
        onChange={handleChangePassword}
        errorMessage={errorMessagePassword}
        required
      />

      <CustomButton
        width='260'
        height='47'
        type='submit'
        bgButton='green'
        disabled={loading === 'Carregando...'}
        content={
          loading === 'Carregando...' ? (
            <React.Fragment>
              <AiOutlineLoading3Quarters />
              Carregando...
            </React.Fragment>
          ) : (
            'Entrar'
          )
        }
      />
    </FormLogin>
  );
}
