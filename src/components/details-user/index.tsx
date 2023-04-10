import { useQuery } from '@apollo/client';
import styles from './styles.module.css';
import { GetToken } from '../../auth-validation/get-token';
import { GET_USER } from '../../auth-validation/gql-queries';
import React from 'react';

interface UserDataProps {
  user: {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  };
}

interface DetailsUserProps {
  selectedUserID: string;
  onCloseModal: () => void;
}

export function DetailsUser({ selectedUserID, onCloseModal }: DetailsUserProps) {
  const { data: userData, error } = useQuery<UserDataProps>(GET_USER, {
    context: {
      headers: { authorization: GetToken },
    },
    variables: {
      itemId: selectedUserID,
    },
  });

  return (
    <div className={styles.container}>
      {userData && (
        <div className={styles.content}>
          <div className={styles.colA}>
            {Object.entries(userData?.user).map(([key, value]) => {
              if (key !== '__typename') {
                // Verificar se a chave é diferente de '__typename'
                return (
                  <React.Fragment key={key}>
                    <h3>{key}:</h3>
                    <p>{value || '-'}</p>
                  </React.Fragment>
                );
              }
              return null; // Não renderizar se a chave for '__typename'
            })}
          </div>
          <button onClick={onCloseModal}>Fechar</button>
        </div>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}
