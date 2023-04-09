import { useQuery } from '@apollo/client';
import styles from './styles.module.css';
import { GetToken } from '../../auth-validation/get-token';
import { GET_USER } from '../../auth-validation/gql-queries';

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
            <h3>ID:</h3>
            <p>{userData?.user.id || '-'}</p>

            <h3>Name:</h3>
            <p>{userData?.user.name || '-'}</p>

            <h3>Email:</h3>
            <p>{userData?.user.email || '-'}</p>
          </div>

          <div className={styles.colB}>
            <h3>Telefone:</h3>
            <p>{userData?.user.phone || '-'}</p>

            <h3>Data de nascimento:</h3>
            <p>{userData?.user.birthDate || '-'}</p>

            <h3>Função:</h3>
            <p>{userData?.user.role || '-'}</p>
          </div>
          <button onClick={onCloseModal}>Fechar</button>
        </div>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}
