import { Title } from '../../components/title';
import { Header } from '../header';
import styles from './styles.module.css';

export function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Title className={styles.title} content='Bem vindo ao Instituto Taqtile' />

        <p>Onde a oportunidade é real</p>
      </div>
    </>
  );
}
