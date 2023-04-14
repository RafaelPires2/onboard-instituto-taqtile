import { Title } from '../../components/title';
import { Header } from '../header';
import { ContainerHome } from './styles';

export function Home() {
  return (
    <>
      <Header />
      <ContainerHome>
        <Title content='Bem vindo ao Instituto Taqtile' />

        <p>Onde a oportunidade é real</p>
      </ContainerHome>
    </>
  );
}
