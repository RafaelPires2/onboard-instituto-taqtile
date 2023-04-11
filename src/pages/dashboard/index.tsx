import { useState } from 'react';
import { UsersList } from '../../components/users-list';
import { Header } from '../header';
import { DetailsUser } from '../../components/details-user';
import styles from './styles.module.css';
import { Title } from '../../components/title';
import { ContainerDashboard } from './styles';

export function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState('');

  const handleUserClick = (userId: string) => {
    setSelectedUserID(userId);
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Header />
      <ContainerDashboard>
        <Title content='Lista de Usuários' />

        {showDetails && <DetailsUser onCloseModal={() => setShowDetails(!showDetails)} selectedUserID={selectedUserID} />}

        <UsersList onUserClick={handleUserClick} />
      </ContainerDashboard>
    </>
  );
}
