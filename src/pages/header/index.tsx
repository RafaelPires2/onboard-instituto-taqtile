import { Link } from 'react-router-dom';
// import styles from './styles.module.css';
import { CustomButton } from '../../components/button';
import { ContainerHeader } from './styles';

function logout() {
  localStorage.removeItem('token');
  console.log('saindo...');
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
}

export function Header() {
  return (
    <>
      <ContainerHeader>
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

        <CustomButton height='47' width='100' bgButton='red' textColor='white' type='button' content='SAIR' onClick={logout} />
      </ContainerHeader>
    </>
  );
}
