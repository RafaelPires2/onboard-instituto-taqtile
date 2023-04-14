import { useQuery } from '@apollo/client';
import { GetToken } from '../../auth-validation/get-token';
import { GET_USER } from '../../auth-validation/gql-queries';
import React from 'react';
import { CustomButton } from '../button';
import { ContainerDetails } from './styles';

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
    <ContainerDetails>
      {userData && (
        <div className='content'>
          {Object.entries(userData?.user).map(([key, value]) => {
            if (key !== '__typename') {
              // Verificar se a chave é diferente de '__typename'
              return (
                <React.Fragment key={key}>
                  <div className='boxData'>
                    <h3>{key}:</h3>
                    <p>{value || '-'}</p>
                  </div>
                </React.Fragment>
              );
            }
            return null; // Não renderizar se a chave for '__typename'
          })}
          <CustomButton height='47' width='100' bgButton='red' textColor='white' type='button' content='SAIR' onClick={onCloseModal} />
        </div>
      )}
      {error && <p>{error.message}</p>}
    </ContainerDetails>
  );
}
