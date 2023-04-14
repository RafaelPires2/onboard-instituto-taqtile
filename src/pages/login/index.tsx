import { LoginForm } from '../../components/login-form';
import { Title } from '../../components/title';
import { Header } from '../header';
import { ContainerLogin } from './styled';

export function Login() {
  return (
    <>
      <Header />
      <ContainerLogin>
        <Title content='Fazer Login na Taqtile' />
        <LoginForm />
      </ContainerLogin>
    </>
  );
}
