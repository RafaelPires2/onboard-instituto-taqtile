import { UsersList } from '../../components/users-list';
import { Header } from '../header';

export function Dashboard() {
  return (
    <div>
      <Header />
      <h1>Lista de Usuários</h1>

      <UsersList />
    </div>
  );
}
