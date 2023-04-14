import { useState } from 'react';
import { UsersList } from '../../components/users-list';
import { Header } from '../header';
import { DetailsUser } from '../../components/details-user';
import styles from './styles.module.css';
import { Title } from '../../components/title';

export function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState('');

  const handleUserClick = (userId: string) => {
    setSelectedUserID(userId);
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.containerDashboard}>
      <Header />
      <Title content='Lista de Usuários' />

      {showDetails && <DetailsUser onCloseModal={() => setShowDetails(!showDetails)} selectedUserID={selectedUserID} />}

      <UsersList onUserClick={handleUserClick} />
    </div>
  );
}
