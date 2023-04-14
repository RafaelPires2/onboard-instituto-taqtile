import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { CustomButton } from '../../components/button';

function logout() {
  localStorage.removeItem('token');
  console.log('saindo...');
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
}

export function Header() {
  return (
    <>
      <div className={styles.container}>
        <h1>I.T</h1>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </nav>

        <CustomButton className={styles.buttonLogout} type='button' content='SAIR' onClick={logout} />
      </div>
    </>
  );
}
