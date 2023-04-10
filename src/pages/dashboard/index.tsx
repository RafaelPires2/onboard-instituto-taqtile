import { useState } from 'react';
import { UsersList } from '../../components/users-list';
import { Header } from '../header';
import { DetailsUser } from '../../components/details-user';

export function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState('');

  const handleUserClick = (userId: string) => {
    setSelectedUserID(userId);
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <Header />
      <h1>Lista de Usuários</h1>

      {showDetails && <DetailsUser onCloseModal={() => setShowDetails(!showDetails)} selectedUserID={selectedUserID} />}

      <UsersList onUserClick={handleUserClick} />
    </div>
  );
}
