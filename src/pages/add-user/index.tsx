import { differenceInYears, format, isBefore, isValid } from 'date-fns';
import { birthDateRegex, emailRegex, passwordRegex, phoneRegex } from '../../auth-validation/regex-validators';
import styles from './styles.module.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../../auth-validation/gql-queries';

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
  const [errorMessageDate, setErrorMessageDate] = useState('');
  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const token = localStorage.getItem('token');

  const [createUser] = useMutation(CREATE_USER_MUTATION);

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

    if (birthDateIsValid && emailIsValid && phoneIsValid && passwordIsValid) {
      try {
        await createUser({
          context: {
            headers: { authorization: token },
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
        alert('usuario cadastrado com sucesso');

        setActivePageAddUser(false);
      } catch (error) {
        console.error(error);
      }
    } else if (!phoneIsValid) {
      setErrorMessagePhone('O telefone deve conter 11 números sem espaço ou caracteres');
    } else if (!emailIsValid) {
      setErrorMessageEmail('O email deve conter email@email.com');
    } else if (!birthDateIsValid) {
      setErrorMessageDate('A data de aniversário deve ser válida');
    } else if (!passwordIsValid) {
      setErrorMessagePassword('A senha deve conter no mínimo 7 caracteres 1 letra e 1 número');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateUser}>
        <label htmlFor='name'>Nome:</label>
        <input name='name' type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor='email'>Email:</label>
        <input name='email' type='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />
        {<p className={styles.error}>{errorMessageEmail}</p>}

        <label htmlFor='phone'>Telefone:</label>
        <input name='phone' type='tel' placeholder='Telefone' value={phone} onChange={handleChangePhone} maxLength={11} required />
        {<p className={styles.error}>{errorMessagePhone}</p>}

        <label htmlFor='birthDate'>Data de nascimento:</label>
        <input name='birthDate' type='date' placeholder='Data de nascimento' value={birthDate} onChange={handleChangeBirthDate} required />
        {<p className={styles.error}>{errorMessageDate}</p>}

        <label htmlFor='password'>Senha</label>
        <input name='password' type='password' placeholder='Digite sua senha' value={password} onChange={handleChangePassword} required />
        <p className={styles.error}>{errorMessagePassword}</p>

        <label htmlFor='role'>Função:</label>
        <select name='role' value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value='user'>Usuário</option>
          <option value='admin'>Admin</option>
        </select>

        <div>
          <button type='submit'>Salvar</button>
          <button type='button' onClick={() => setActivePageAddUser(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
