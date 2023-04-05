import { birthDateRegex, emailRegex } from '../../auth-validation/regex-validators';
import styles from './styles.module.css';
import { useState } from 'react';

export function PageAddUser({ active, setActive }: any) {
  const [birthDate, setBirthDate] = useState<any>('');
  const [birthDateIsValid, setBirthDateIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [errorMessageDate, setErrorMessageDate] = useState('');

  function handleChangeBirthDate(event: any) {
    const newBirthDate = event.target.value;
    setBirthDate(newBirthDate);

    setBirthDateIsValid(birthDateRegex.test(newBirthDate));
  }
  function handleChangeEmail(event: any) {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setEmailIsValid(emailRegex.test(newEmail));
  }

  function handleSubmit() {
    if (birthDateIsValid && emailIsValid) {
      console.log(birthDate, email, name, phone, role);
    } else if (!birthDateIsValid) {
      setErrorMessageDate('A data de aniversário deve ser válida');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='name'>Nome:</label>
        <input name='name' type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor='email'>Email:</label>
        <input name='email' type='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />

        <label htmlFor='phone'>Telefone:</label>
        <input
          name='phone'
          type='number'
          placeholder='Telefone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={11}
          required
        />

        <label htmlFor='birthDate'>Data de nascimento:</label>
        <input name='birthDate' type='date' placeholder='Data de nascimento' value={birthDate} onChange={handleChangeBirthDate} required />
        {<p>{errorMessageDate}</p>}

        <label htmlFor='role'>Função:</label>
        <select name='role' value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value='user'>Usuário</option>
          <option value='admin'>Admin</option>
        </select>

        <div>
          <button type='submit'>Salvar</button>
          <button type='button' onClick={() => setActive(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
