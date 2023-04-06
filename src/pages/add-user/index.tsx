import { differenceInYears, format, isBefore, isValid } from 'date-fns';
import { birthDateRegex, emailRegex, passwordRegex, phoneRegex } from '../../auth-validation/regex-validators';
import styles from './styles.module.css';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../../auth-validation/gql-queries';
import { GetToken } from '../../auth-validation/get-token';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Input } from '../../components/input';

const ERROR_MESSAGES = {
  date: 'A data de aniversário deve ser válida',
  phone: 'O telefone deve conter 11 números sem espaço ou caracteres',
  email: 'O email deve conter email@email.com',
  password: 'A senha deve conter no mínimo 7 caracteres 1 letra e 1 número',
};

export function PageAddUser({ activePageAddUser, setActivePageAddUser }: any) {
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const [birthDateIsValid, setBirthDateIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [loading, setLoading] = useState('Entrar');
  const [error, setError] = useState({
    date: '',
    phone: '',
    email: '',
    password: '',
  });

  const [createUser, { data }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      alert('usuario cadastrado com sucesso');
      setActivePageAddUser(false);
    },
  });

  function handleChangeBirthDate(event: any) {
    const newBirthDate = event.target.value;
    setBirthDate(newBirthDate);

    const formattedBirthDate = format(new Date(newBirthDate), 'dd/MM/yyyy');

    const isValidFormat = birthDateRegex.test(formattedBirthDate);

    const isBeforeCurrentDate = isValid(new Date(newBirthDate)) && isBefore(new Date(newBirthDate), new Date());

    const isUnder120Years = differenceInYears(new Date(), new Date(newBirthDate)) < 120;

    setBirthDateIsValid(isValidFormat && isBeforeCurrentDate && isUnder120Years);
  }

  function handleChangePassword(event: any) {
    const newPassword = event.target.value;
    setPassword(newPassword);

    setPasswordIsValid(passwordRegex.test(newPassword));
  }

  function handleChangeEmail(event: any) {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setEmailIsValid(emailRegex.test(newEmail));
  }

  function handleChangePhone(event: any) {
    const newPhone = event.target.value;
    setPhone(newPhone);

    setPhoneIsValid(phoneRegex.test(newPhone));
  }

  async function handleCreateUser(event: any) {
    event.preventDefault();

    if (!birthDateIsValid || !emailIsValid || !phoneIsValid || !passwordIsValid) {
      setError({
        date: !birthDateIsValid ? ERROR_MESSAGES.date : '',
        email: !emailIsValid ? ERROR_MESSAGES.email : '',
        phone: !phoneIsValid ? ERROR_MESSAGES.phone : '',
        password: !passwordIsValid ? ERROR_MESSAGES.password : '',
      });
      return;
    }

    setLoading('Carregando...');
    try {
      await createUser({
        context: {
          headers: { authorization: GetToken },
        },
        variables: {
          data: {
            name: name,
            phone: phone,
            birthDate: birthDate,
            email: email,
            role: role,
            password: password,
          },
        },
      });
    } catch (error) {
      setLoading('Entrar');
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateUser}>
        <Input label='Nome:' name='name' type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} required />

        <Input
          label='Email:'
          name='email'
          type='email'
          placeholder='email'
          value={email}
          onChange={handleChangeEmail}
          required
          errorMessage={error.email}
        />

        <Input
          label='Telefone:'
          name='phone'
          type='tel'
          placeholder='Telefone'
          value={phone}
          onChange={handleChangePhone}
          required
          errorMessage={error.phone}
          maxLength={11}
        />

        <Input
          label='Data de nascimento'
          name='birthDate'
          type='date'
          placeholder='Data de nascimento'
          value={birthDate}
          onChange={handleChangeBirthDate}
          required
          errorMessage={error.date}
        />

        <Input
          label='Senha'
          name='password'
          type='password'
          placeholder='Digite sua senha'
          value={password}
          onChange={handleChangePassword}
          required
          errorMessage={error.password}
        />

        <label htmlFor='role'>Função:</label>
        <select name='role' value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value='user'>Usuário</option>
          <option value='admin'>Admin</option>
        </select>

        <div>
          <button type='submit' disabled={loading === 'Carregando...'}>
            {loading === 'Carregando...' ? (
              <React.Fragment>
                <AiOutlineLoading3Quarters />
                Carregando...
              </React.Fragment>
            ) : (
              'Entrar'
            )}
          </button>
          <button type='button' onClick={() => setActivePageAddUser(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
