import { LoginForm } from '../../components/login-form';
import { Title } from '../../components/title';
import { Header } from '../header';
import styles from './styles.module.css';

export function Login() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Title className={styles.title} content='Fazer Login no Istituto Taqtile' />
        <LoginForm />
      </div>
    </>
  );
}
